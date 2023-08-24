using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.EmpresasRequest;
using Holerite.Application.Commands.Holerite.Responses.EmpresasResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Messages;
using Holerite.Core.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Handlers
{
    public class EmpresasCommandHandler : CommandHandler,
        IRequestHandler<CreateEmpresasRequest, ValidationResultBag>,
        IRequestHandler<PatchEmpresasRequest, ValidationResultBag>,
        IRequestHandler<UpdateEmpresasRequest, ValidationResultBag>,
        IRequestHandler<DeleteEmpresasRequest, ValidationResultBag>,
        IRequestHandler<FilterEmpresasRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IEmpresasService _empresasService;

        public EmpresasCommandHandler(IMapper mapper,
            IEmpresasService empresasService)
        {
            _mapper = mapper;
            _empresasService = empresasService;
        }

        public async Task<ValidationResultBag> Handle(FilterEmpresasRequest request, CancellationToken cancellationToken)
        {
            IEnumerable<EmpresasDto?> listaEmpresas = await _empresasService.GetAll();

            ValidationResult.Data = _mapper.Map<List<EmpresasResponse>>(listaEmpresas);

            return ValidationResult;

        }

        public async Task<ValidationResultBag> Handle(CreateEmpresasRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                return ValidationResult;
            }

            EmpresasDto empresa = _mapper.Map<EmpresasDto>(request);

            var resultEmpresa = await _empresasService.Create(empresa);

            ValidationResult.Data = _mapper.Map<EmpresasResponse>(resultEmpresa);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(UpdateEmpresasRequest request, CancellationToken cancellationToken)
        {
            EmpresasDto? empresa = _mapper.Map<EmpresasDto>(request);

            var resultEmpresa = await _empresasService.Update(empresa);

            ValidationResult.Data = _mapper.Map<EmpresasResponse>(resultEmpresa);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(PatchEmpresasRequest request, CancellationToken cancellationToken)
        {
            EmpresasDto? empresas = await _empresasService.GetById(request.Id);

            if (empresas == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }

            var patchEmpresas = _mapper.Map<PatchEmpresasRequest>(empresas);

            request.PatchEmpresas.ApplyTo(patchEmpresas);

            _mapper.Map(patchEmpresas, empresas);

            var resultEmpresas = await _empresasService.Update(empresas);

            ValidationResult.Data = _mapper.Map<EmpresasResponse>(resultEmpresas);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(DeleteEmpresasRequest request, CancellationToken cancellationToken)
        {
            var pessoas = await _empresasService.GetById(request.Id);

            if (!request.IsValid()) return ValidationResult;

            if (pessoas == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }
            ValidationResult.Data = await _empresasService.Delete(pessoas);

            return ValidationResult;
        }
    }
}
