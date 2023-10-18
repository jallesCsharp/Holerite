using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Core.Interfaces.Services.EmailSMTP;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Services.Controler;
using Holerite.Core.Services.EmailSMTP;
using Holerite.Core.Services.Holerite;
using Microsoft.Extensions.DependencyInjection;

namespace Holerite.IOC.IOC;

public static class ServicesInjector
{
    public static IServiceCollection AddServicesInjector(this IServiceCollection services)
    {
        services.AddScoped<IEmailSMTPService, EmailSMTPService>();
        services.AddScoped<IArquivoDocumentosService, ArquivoDocumentosService>();
        services.AddScoped<IArquivosService, ArquivosService>();
        services.AddScoped<IEmpresasService, EmpresasService>();
        services.AddScoped<IPessoasService, PessoasService>();
        services.AddScoped<IProfissoesService, ProfissoesService>();
        services.AddScoped<IUploadCreateRegistrationService, UploadCreateRegistrationService>();
        services.AddScoped<IControlerService, ControlerService>();
        services.AddScoped<IPerfilService, PerfilService>();
        services.AddScoped<IControleAcessosService, ControleAcessosService>();

        return services;

    }
}
