using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Services.Holerite;
using Microsoft.Extensions.DependencyInjection;

namespace Holerite.IOC.IOC;

public static class ServicesInjector
{
    public static IServiceCollection AddServicesInjector(this IServiceCollection services)
    {
        services.AddScoped<IArquivoDocumentosService, ArquivoDocumentosService>();
        services.AddScoped<IArquivosService, ArquivosService>();
        services.AddScoped<IEmpresasService, EmpresasService>();
        services.AddScoped<IPessoasService, PessoasService>();
        services.AddScoped<IProfissoesService, ProfissoesService>();
        services.AddScoped<IUploadCreateRegistrationService, UploadCreateRegistrationService>();


        return services;

    }
}
