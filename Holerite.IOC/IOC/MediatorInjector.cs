using MediatR;
using Holerite.Core.Mediator;
using Holerite.Core.Validation;
using Holerite.Core.Mediator.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;
using Holerite.Application.Commands.Holerite.Handlers;
using Holerite.Application.Commands.Holerite.Requests.PessoasRequest;
using Holerite.Application.Commands.Holerite.Requests.ArquivosRequest;
using Holerite.Application.Commands.Holerite.Requests.EmpresasRequest;
using Holerite.Application.Commands.Holerite.Requests.ArquivoDocumentosRequest;
using Holerite.Application.Commands.Email.Handlers;
using Holerite.Application.Commands.Email.Requests;
using Holerite.Application.Commands.Controler.Handlers;
using Holerite.Application.Commands.Controler.Requests;
using Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest;
using Holerite.Application.Commands.Controler.Requests.PerfilRequest;
using Holerite.Application.Commands.Controler.Requests.FuncionalidadesRequest;

namespace Holerite.IOC.IOC;

public static class MediatorInjector
{
    public static IServiceCollection AddMediatorInjector(this IServiceCollection services)
    {   
        services.AddScoped<IMediatorHandler, MediatorHandler>();

        services.AddScoped<IRequestHandler<CreateEmailSettingsRequest, ValidationResultBag>, EmailSettingsCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateEmailSettingsRequest, ValidationResultBag>, EmailSettingsCommandHandler>();


        services.AddScoped<IRequestHandler<CreateArquivosRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<PatchArquivosRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateArquivosRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<UploadFileRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<ConfirmarEnvioEmailArquivosRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<ReenviarEmailRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteArquivosRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<FilterArquivosHoleriteRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<FilterArquivosPendentesHoleriteRequest, ValidationResultBag>, ArquivosCommandHandler>();
        
        
        services.AddScoped<IRequestHandler<CreateEmpresasRequest, ValidationResultBag>, EmpresasCommandHandler>();
        services.AddScoped<IRequestHandler<PatchEmpresasRequest, ValidationResultBag>, EmpresasCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateEmpresasRequest, ValidationResultBag>, EmpresasCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteEmpresasRequest, ValidationResultBag>, EmpresasCommandHandler>();
        services.AddScoped<IRequestHandler<FilterEmpresasRequest, ValidationResultBag>, EmpresasCommandHandler>();


        services.AddScoped<IRequestHandler<CreateProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<PatchProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<FilterProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();


        services.AddScoped<IRequestHandler<CreatePessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<DeletePessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<PatchPessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<UpdatePessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<FilterPessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        

        services.AddScoped<IRequestHandler<CreateArquivoDocumentosRequest, ValidationResultBag>, ArquivoDocumentosCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateArquivoDocumentosRequest, ValidationResultBag>, ArquivoDocumentosCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteArquivoDocumentosRequest, ValidationResultBag>, ArquivoDocumentosCommandHandler>();
        services.AddScoped<IRequestHandler<FilterArquivoDocumentosRequest, ValidationResultBag>, ArquivoDocumentosCommandHandler>();


        services.AddScoped<IRequestHandler<LoginAuthRequest, ValidationResultBag>, ControlerCommandHandler>();
        services.AddScoped<IRequestHandler<CreateLoginAuthRequest, ValidationResultBag>, ControlerCommandHandler>();


        services.AddScoped<IRequestHandler<CreateControleAcessosRequest, ValidationResultBag>, ControleAcessosCommandHandler>();
        services.AddScoped<IRequestHandler<PatchControleAcessosRequest, ValidationResultBag>, ControleAcessosCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateControleAcessosRequest, ValidationResultBag>, ControleAcessosCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteControleAcessosRequest, ValidationResultBag>, ControleAcessosCommandHandler>();
        services.AddScoped<IRequestHandler<FilterControleAcessosRequest, ValidationResultBag>, ControleAcessosCommandHandler>();
        
        
        services.AddScoped<IRequestHandler<CreatePerfilRequest, ValidationResultBag>, PerfilCommandHandler>();
        services.AddScoped<IRequestHandler<UpdatePerfilRequest, ValidationResultBag>, PerfilCommandHandler>();
        services.AddScoped<IRequestHandler<DeletePerfilRequest, ValidationResultBag>, PerfilCommandHandler>();
        services.AddScoped<IRequestHandler<FilterPerfilRequest, ValidationResultBag>, PerfilCommandHandler>();
        
        services.AddScoped<IRequestHandler<FilterFuncionalidadesRequest, ValidationResultBag>, FuncionalidadesCommandHandler>();


        return services;
    }
}