﻿using AutoMapper;
using Holerite.IOC.AutoMapperProfiles;
using Microsoft.Extensions.DependencyInjection;

namespace Holerite.IOC.IOC
{
    public static class AutoMapperInjector
    {
        public static IServiceCollection AddAutoMapperInjector(this IServiceCollection services)
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new ArquivosProfile());
                mc.AddProfile(new EmpresasProfile());
                mc.AddProfile(new PessoasProfile());
                mc.AddProfile(new ProfissoesProfile());
            });

            var mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            return services;
        }
    }
}
