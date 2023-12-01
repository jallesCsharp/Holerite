using MediatR;
using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Messages;
using Holerite.Core.Validation;
using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest;
using Holerite.Application.Commands.Controler.Responses.ControleAcessosResponses;
using Holerite.Core.Models;

namespace Holerite.Application.Commands.Controler.Handlers
{
    public class ControleAcessosCommandHandler : CommandHandler,
        IRequestHandler<CreateControleAcessosRequest, ValidationResultBag>,
        IRequestHandler<CreatePerfilControleAcessoRequest, ValidationResultBag>,
        IRequestHandler<PatchControleAcessosRequest, ValidationResultBag>,
        IRequestHandler<UpdateControleAcessosRequest, ValidationResultBag>,
        IRequestHandler<DeleteControleAcessosRequest, ValidationResultBag>,
        IRequestHandler<FilterControleAcessosRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IControleAcessosService _controleAcessosService;

        public ControleAcessosCommandHandler(IMapper mapper,
            IControleAcessosService controleAcessosService)
        {
            _mapper = mapper;
            _controleAcessosService = controleAcessosService;
        }

        public async Task<ValidationResultBag> Handle(FilterControleAcessosRequest request, CancellationToken cancellationToken)
        {
            IEnumerable<ControleAcessosDto?> listaControleAcesso = await _controleAcessosService.GetAll();

            ValidationResult.Data = _mapper.Map<List<ControleAcessosResponse>>(listaControleAcesso);

            return ValidationResult;

        }

        public async Task<ValidationResultBag> Handle(CreateControleAcessosRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                return ValidationResult;
            }

            ControleAcessosDto controleAcesso = _mapper.Map<ControleAcessosDto>(request);

            var result = await _controleAcessosService.Create(controleAcesso);

            ValidationResult.Data = _mapper.Map<ControleAcessosResponse>(result);

            return ValidationResult;
        }
        
        public async Task<ValidationResultBag> Handle(CreatePerfilControleAcessoRequest request, CancellationToken cancellationToken)
        {
            if (request.Funcionalidades is null)
                throw new Exception("Lista de Funcionalidades nulo.");
            List<ControleAcessosDto> listaControleAcessos = new List<ControleAcessosDto>();

            request.Funcionalidades.ToList().ForEach(item =>
            {
                listaControleAcessos.Add(new ControleAcessosDto()
                {
                    PerfilId = request.Perfil?.Id,
                    FuncionalidadesId = item.Id,
                    Created = DateTime.UtcNow,

                });
            });
            await _controleAcessosService.CreateAll(listaControleAcessos);

            List<ControleAcessosDto>? result = await _controleAcessosService.GetByPerfilId(request.Perfil?.Id);

            ValidationResult.Data = _mapper.Map<List<ControleAcessosResponse>>(result);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(UpdateControleAcessosRequest request, CancellationToken cancellationToken)
        {
            ControleAcessosDto? controleAcesso = _mapper.Map<ControleAcessosDto>(request);

            var result = await _controleAcessosService.Update(controleAcesso);

            ValidationResult.Data = _mapper.Map<ControleAcessosResponse>(result);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(PatchControleAcessosRequest request, CancellationToken cancellationToken)
        {
            ControleAcessosDto? controleAcessos = await _controleAcessosService.GetById(request.Id);

            if (controleAcessos == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }

            var patch = _mapper.Map<PatchControleAcessosRequest>(controleAcessos);

            request.Patch.ApplyTo(patch);

            _mapper.Map(patch, controleAcessos);

            var result = await _controleAcessosService.Update(controleAcessos);

            ValidationResult.Data = _mapper.Map<ControleAcessosResponse>(result);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(DeleteControleAcessosRequest request, CancellationToken cancellationToken)
        {
            var controleAcesso = await _controleAcessosService.GetById(request.Id);

            if (!request.IsValid()) return ValidationResult;

            if (controleAcesso == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }
            ValidationResult.Data = await _controleAcessosService.Delete(controleAcesso);

            return ValidationResult;
        }
    }
}
