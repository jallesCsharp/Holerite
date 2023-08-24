using MediatR;
using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.PessoasRequest;
using Holerite.Application.Commands.Holerite.Responses.PessoasResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Messages;
using Holerite.Core.Validation;

namespace Holerite.Application.Commands.Holerite.Handlers
{
    public class PessoasCommandHandler : CommandHandler,
        IRequestHandler<CreatePessoasRequest, ValidationResultBag>,
        IRequestHandler<PatchPessoasRequest, ValidationResultBag>,
        IRequestHandler<UpdatePessoasRequest, ValidationResultBag>,
        IRequestHandler<DeletePessoasRequest, ValidationResultBag>,
        IRequestHandler<FilterPessoasRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IPessoasService _pessoasService;

        public PessoasCommandHandler(IMapper mapper,
            IPessoasService pessoasService)
        {
            _mapper = mapper;
            _pessoasService = pessoasService;
        }

        public async Task<ValidationResultBag> Handle(FilterPessoasRequest request, CancellationToken cancellationToken)
        {
            List<PessoasDto?> listaPessoas = new List<PessoasDto?>();
            IEnumerable<PessoasDto?> pessoas = await _pessoasService.GetAll();

            if (listaPessoas.Count == 0)
                listaPessoas.AddRange(pessoas.OrderBy(pX => pX?.Nome).ToList());

            if (request.DataInicio.HasValue && request.DataFim.HasValue)
                listaPessoas = listaPessoas.ToList().Where(pX => pX?.Created >= request?.DataInicio && pX?.Created <= request?.DataFim).ToList();

            if (request.Id != Guid.Empty)
                listaPessoas = listaPessoas.ToList().Where(pX => pX?.Id == request.Id).ToList();

            if (!String.IsNullOrEmpty(request.Nome) && (!request.DataInicio.HasValue && !request.DataFim.HasValue))
                listaPessoas = listaPessoas.ToList().Where(pX => pX.Nome.ToLower().Contains(request.Nome.ToLower())).ToList();

            
            //var pessoas = _mapper.Map<PessoasDto>(request);

            ValidationResult.Data = _mapper.Map<List<PessoasResponse>>(listaPessoas);

            return ValidationResult;

        }

        public async Task<ValidationResultBag> Handle(CreatePessoasRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                //ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                AddError("Registro não existe.");
                return ValidationResult;
            }

            var pessoas = _mapper.Map<PessoasDto>(request);

            var resultPessoas = await _pessoasService.Create(pessoas);

            ValidationResult.Data = _mapper.Map<PessoasResponse>(resultPessoas);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(UpdatePessoasRequest request, CancellationToken cancellationToken)
        {
            PessoasDto? pessoas = _mapper.Map<PessoasDto>(request);

            var resultPessoas = await _pessoasService.Update(pessoas);

            ValidationResult.Data = _mapper.Map<PessoasResponse>(resultPessoas);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(PatchPessoasRequest request, CancellationToken cancellationToken)
        {
            PessoasDto? pessoas = await _pessoasService.GetById(request.Id);

            if (pessoas == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }

            var patchPessoas = _mapper.Map<PatchPessoasRequest>(pessoas);

            request.PatchPessoas.ApplyTo(patchPessoas);

            _mapper.Map(patchPessoas, pessoas);

            var resultPessoas = await _pessoasService.Update(pessoas);

            ValidationResult.Data = _mapper.Map<PessoasResponse>(resultPessoas);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(DeletePessoasRequest request, CancellationToken cancellationToken)
        {
            var pessoa = await _pessoasService.GetById(request.Id);

            if (!request.IsValid()) return ValidationResult;

            if (pessoa == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }
            ValidationResult.Data = await _pessoasService.Delete(pessoa);

            return ValidationResult;
        }
    }
}
