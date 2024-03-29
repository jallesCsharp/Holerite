﻿using Holerite.Core.Interfaces.Repositories;
using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Interfaces.Repositories.Email;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Infra;
using Holerite.Infra.Repositories;
using Holerite.Infra.Repositories.Controler;
using Holerite.Infra.Repositories.Email;
using Holerite.Infra.Repositories.Holerite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using XUtilities.NetCore6.Seguranca;

namespace Holerite.IOC.IOC;

public static class DbInjector
{
    public static IServiceCollection AddDbInjector(this IServiceCollection services)
    {
        services.AddTransient<HoleriteContext>();

        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

        services.AddScoped<IArquivoDocumentosRepository, ArquivoDocumentosRepository>();
        services.AddScoped<IArquivosRepository, ArquivosRepository>();
        services.AddScoped<IEmpresasRepository, EmpresasRepository>();
        services.AddScoped<IPessoasRepository, PessoasRepository>();
        services.AddScoped<IProfissoesRepository, ProfissoesRepository>();
        services.AddScoped<IEmailSettingsRepository, EmailSettingsRepository>();
        services.AddScoped<ILoginRepository, LoginRepository>();
        services.AddScoped<IControleAcessosRepository, ControleAcessosRepository>();
        services.AddScoped<IFuncionalidadesRepository, FuncionalidadesRepository>();
        services.AddScoped<IPerfilRepository, PerfilRepository>();


        return services;
    }

    public static IServiceCollection AddDbContextInjector(this IServiceCollection services, string[] connectionString)
    {
        services.AddDbContext<HoleriteContext>(options => {
            options.UseNpgsql(@$"Host={XAesCrip.Decriptografar(connectionString[0])};Port={XAesCrip.Decriptografar(connectionString[1])};Pooling={XAesCrip.Decriptografar(connectionString[2])};Database={XAesCrip.Decriptografar(connectionString[3])};User Id={XAesCrip.Decriptografar(connectionString[4])};Password={XAesCrip.Decriptografar(connectionString[5])}");
            options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
        );
        return services;
    }
}
