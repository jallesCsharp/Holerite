using AutoMapper;
using Holerite.Application.Commands.Controler.Requests.PerfilRequest;
using Holerite.Application.Commands.Controler.Responses.PerfilResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Core.Messages;
using Holerite.Core.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Handlers
{
    public class PerfilCommandHandler : CommandHandler,
        IRequestHandler<CreatePerfilRequest, ValidationResultBag>,
        IRequestHandler<UpdatePerfilRequest, ValidationResultBag>,
        IRequestHandler<DeletePerfilRequest, ValidationResultBag>,
        IRequestHandler<FilterPerfilRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IPerfilService _perfilService;

        public PerfilCommandHandler(IMapper mapper,
            IPerfilService perfilService)
        {
            _mapper = mapper;
            _perfilService = perfilService;
        }

        public async Task<ValidationResultBag> Handle(FilterPerfilRequest request, CancellationToken cancellationToken)
        {
            IEnumerable<PerfilDto?> listaControleAcesso = await _perfilService.GetAll();

            ValidationResult.Data = _mapper.Map<List<PerfilResponse>>(listaControleAcesso);

            return ValidationResult;

        }

        public async Task<ValidationResultBag> Handle(CreatePerfilRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                return ValidationResult;
            }

            PerfilDto perfil = _mapper.Map<PerfilDto>(request);

            var result = await _perfilService.Create(perfil);

            ValidationResult.Data = _mapper.Map<PerfilResponse>(result);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(UpdatePerfilRequest request, CancellationToken cancellationToken)
        {
            PerfilDto? perfil = _mapper.Map<PerfilDto>(request);

            var result = await _perfilService.Update(perfil);

            ValidationResult.Data = _mapper.Map<PerfilResponse>(result);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(DeletePerfilRequest request, CancellationToken cancellationToken)
        {
            var perfil = await _perfilService.GetById(request.Id);

            if (!request.IsValid()) return ValidationResult;

            if (perfil == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }
            ValidationResult.Data = await _perfilService.Delete(perfil);

            return ValidationResult;
        }
    }
}
