using Holerite.Core.Interfaces.Services.Holerite;
using Microsoft.Extensions.DependencyInjection;

namespace Holerite.IOC.IOC;

public static class ServicesInjector
{
    public static IServiceCollection AddServicesInjector(this IServiceCollection services)
    {
        services.AddScoped<IArquivosService, ArquivosService>();
        services.AddScoped<IEmpresasService, EmpresasService>();
        services.AddScoped<IPessoasService, PessoasService>();
        services.AddScoped<IProfissoesService, ProfissoesService>();


        return services;

    }
}
