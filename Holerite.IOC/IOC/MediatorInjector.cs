﻿using MediatR;
using Holerite.Core.Mediator;
using Holerite.Core.Validation;
using Holerite.Core.Mediator.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;
using Holerite.Application.Commands.Holerite.Handlers;
using Holerite.Application.Commands.Holerite.Requests.PessoasRequest;
using Holerite.Application.Commands.Holerite.Requests.ArquivosRequest;
using Holerite.Application.Commands.Holerite.Requests.EmpresasRequest;
using Holerite.Application.Commands.Holerite.Requests.LoginRequest;
using Holerite.Application.Commands.Holerite.Requests.ArquivoDocumentosRequest;
using Holerite.Application.Commands.Holerite.Responses.PessoasResponses;

namespace Holerite.IOC.IOC;

public static class MediatorInjector
{
    public static IServiceCollection AddMediatorInjector(this IServiceCollection services)
    {   
        services.AddScoped<IMediatorHandler, MediatorHandler>();

        services.AddScoped<IRequestHandler<LoginAuthRequest, ValidationResultBag>, LoginAuthCommandHandler>();

        //services.AddScoped<IRequestHandler<CreateArquivosRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<PatchArquivosRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateArquivosRequest, ValidationResultBag>, ArquivosCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteArquivosRequest, ValidationResultBag>, ArquivosCommandHandler>();
        //services.AddScoped<IRequestHandler<UploadFileRequest, ValidationResultBag>, ArquivosCommandHandler>();
        
        
        services.AddScoped<IRequestHandler<CreateEmpresasRequest, ValidationResultBag>, EmpresasCommandHandler>();
        services.AddScoped<IRequestHandler<PatchEmpresasRequest, ValidationResultBag>, EmpresasCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateEmpresasRequest, ValidationResultBag>, EmpresasCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteEmpresasRequest, ValidationResultBag>, EmpresasCommandHandler>();


        services.AddScoped<IRequestHandler<CreateProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<PatchProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();

        services.AddScoped<IRequestHandler<CreatePessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<DeletePessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<PatchPessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<UpdatePessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<FilterPessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        
        services.AddScoped<IRequestHandler<CreateArquivoDocumentosRequest, ValidationResultBag>, ArquivoDocumentosCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateArquivoDocumentosRequest, ValidationResultBag>, ArquivoDocumentosCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteArquivoDocumentosRequest, ValidationResultBag>, ArquivoDocumentosCommandHandler>();

        return services;
    }
}