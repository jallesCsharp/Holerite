using Holerite.Core.Interfaces.Repositories;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Infra;
using Holerite.Infra.Repositories;
using Holerite.Infra.Repositories.Holerite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Holerite.IOC.IOC;

public static class DbInjector
{
    public static IServiceCollection AddDbInjector(this IServiceCollection services)
    {
        services.AddTransient<HoleriteContext>();

        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

        services.AddScoped<IArquivosRepository, ArquivosRepository>();
        services.AddScoped<IEmpresasRepository, EmpresasRepository>();
        services.AddScoped<IPessoasRepository, PessoasRepository>();
        services.AddScoped<IProfissoesRepository, ProfissoesRepository>();


        return services;
    }

    //public static IServiceCollection AddDbContextInjector(this IServiceCollection services, string connectionString)
    //{
    //    services.AddDbContext<HoleriteContext>(options =>
    //        options.UseSqlite(connectionString)
    //    );

    //    return services;
    //}
}
