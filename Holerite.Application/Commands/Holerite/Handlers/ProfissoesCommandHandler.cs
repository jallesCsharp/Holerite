using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;
using Holerite.Application.Commands.Holerite.Responses.ProfissoesResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Messages;
using MediatR;
using Holerite.Core.Validation;

namespace Holerite.Application.Commands.Holerite.Handlers
{
    public class ProfissoesCommandHandler : CommandHandler,
        IRequestHandler<CreateProfissoesRequest, ValidationResultBag>,
        IRequestHandler<PatchProfissoesRequest, ValidationResultBag>,
        IRequestHandler<UpdateProfissoesRequest, ValidationResultBag>,
        IRequestHandler<DeleteProfissoesRequest, ValidationResultBag>,
        IRequestHandler<FilterProfissoesRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IProfissoesService _profissoesService;

        public ProfissoesCommandHandler(IMapper mapper,
            IProfissoesService profissoesService)
        {
            _mapper = mapper;
            _profissoesService = profissoesService;
        }

        public async Task<ValidationResultBag> Handle(FilterProfissoesRequest request, CancellationToken cancellationToken)
        {
            IEnumerable<ProfissoesDto?> listaProfissoes = await _profissoesService.GetAll();

            if ((!String.IsNullOrWhiteSpace(request.NomeProfissao) && (request.Id != Guid.Empty)))
                listaProfissoes = listaProfissoes.Where(pX => pX?.Id == request.Id).ToList();

            if (!String.IsNullOrWhiteSpace(request.NomeProfissao))
                listaProfissoes = listaProfissoes.Where(pX => pX?.NomeProfissao?.ToLower() == request.NomeProfissao?.ToLower()).ToList();

            ValidationResult.Data = _mapper.Map<List<ProfissoesResponse>>(listaProfissoes);

            return ValidationResult;

        }

        public async Task<ValidationResultBag> Handle(CreateProfissoesRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                return ValidationResult;
            }

            var profissoes = _mapper.Map<ProfissoesDto>(request);

            var resultProfissao = await _profissoesService.Create(profissoes);

            ValidationResult.Data = _mapper.Map<ProfissoesResponse>(resultProfissao);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(UpdateProfissoesRequest request, CancellationToken cancellationToken)
        {
            ProfissoesDto? profissoes = _mapper.Map<ProfissoesDto>(request);

            var result = await _profissoesService.Update(profissoes);

            ValidationResult.Data = _mapper.Map<ProfissoesResponse>(result);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(PatchProfissoesRequest request, CancellationToken cancellationToken)
        {
            var profissao = await _profissoesService.GetById(request.Id);

            if (profissao == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }

            var patchProfissao = _mapper.Map<PatchProfissoesRequest>(profissao);

            request.PatchProfissoes.ApplyTo(patchProfissao);

            _mapper.Map(patchProfissao, profissao);

            var result = await _profissoesService.Update(profissao);

            ValidationResult.Data = _mapper.Map<ProfissoesResponse>(result);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(DeleteProfissoesRequest request, CancellationToken cancellationToken)
        {
            var profissao = await _profissoesService.GetById(request.Id);

            if (!request.IsValid()) return ValidationResult;

            if (profissao == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }
            ValidationResult.Data = await _profissoesService.Delete(profissao);

            return ValidationResult;
        }
    }

}
