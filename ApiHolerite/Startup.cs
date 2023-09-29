using Holerite.Core.Config;
using Holerite.Infra;
using Holerite.Infra.Data;
using Holerite.IOC.IOC;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace ApiHolerite
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            string[] connectionString = 
            { 
                Configuration["Connection:ConHost"], 
                Configuration["Connection:ConPort"],
                Configuration["Connection:ConPooling"],
                Configuration["Connection:ConDatabase"],
                Configuration["Connection:ConUserId"],
                Configuration["Connection:ConPassword"]
            };
            services.AddDbContextInjector(connectionString);

            services.AddAutoMapper(typeof(Startup));
            services.AddMediatR(typeof(Startup));
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddRazorPages();

            services.AddControllersWithViews();
            services.AddDbInjector();
            services.AddServicesInjector();
            services.AddMediatorInjector();
            services.AddAutoMapperInjector();

            services.AddHttpClient();
            services.AddEndpointsApiExplorer();

            services.AddCors(c =>
            {
                c.AddPolicy("AlowsCors", options =>
                {
                    options.AllowAnyOrigin()
                    .WithMethods("GET", "PUT", "POST", "DELETE")
                    .AllowAnyHeader();
                });
            });


            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddEndpointsApiExplorer();

            var key = Encoding.ASCII.GetBytes(Token.Secret);

            services.AddAuthentication(Authentication =>
            {
                Authentication.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                Authentication.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(pX =>
            {
                pX.RequireHttpsMetadata = false;
                pX.SaveToken = true;
                pX.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Holerite", Version = "v1" });
                c.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference {
                                Type = ReferenceType.SecurityScheme,
                                Id = "bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        }, new List<string>() }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            await app.EnsureMigrations();

            app.UseSwaggerUI();
            app.UseSwagger();
            app.UseSwagger(v => v.SerializeAsV2 = true);

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(x => x
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
