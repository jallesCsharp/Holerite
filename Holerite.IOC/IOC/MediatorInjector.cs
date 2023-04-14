using MediatR;
using Holerite.Core.Mediator;
using Holerite.Core.Validation;
using Holerite.Core.Mediator.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;
using Holerite.Application.Commands.Holerite.Handlers;
using Holerite.Application.Commands.Holerite.Requests.PessoasRequest;

namespace Holerite.IOC.IOC;

public static class MediatorInjector
{
    public static IServiceCollection AddMediatorInjector(this IServiceCollection services)
    {   
        services.AddScoped<IMediatorHandler, MediatorHandler>();

        services.AddScoped<IRequestHandler<CreateProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<DeleteProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<PatchProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();
        services.AddScoped<IRequestHandler<UpdateProfissoesRequest, ValidationResultBag>, ProfissoesCommandHandler>();


        services.AddScoped<IRequestHandler<CreatePessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<DeletePessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<PatchPessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        services.AddScoped<IRequestHandler<UpdatePessoasRequest, ValidationResultBag>, PessoasCommandHandler>();
        


        return services;
    }
}