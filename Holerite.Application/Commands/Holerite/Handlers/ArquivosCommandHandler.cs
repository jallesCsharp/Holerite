using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.ArquivosRequest;
using Holerite.Application.Commands.Holerite.Responses.ArquivosResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Messages;
using Holerite.Core.Validation;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Parser;
using MediatR;
using System.Linq;
using System.Text;

namespace Holerite.Application.Commands.Holerite.Handlers
{
    public class ArquivosCommandHandler : CommandHandler,
        IRequestHandler<CreateArquivosRequest, ValidationResultBag>,
        IRequestHandler<PatchArquivosRequest, ValidationResultBag>,
        IRequestHandler<UpdateArquivosRequest, ValidationResultBag>,
        IRequestHandler<UploadFileRequest, ValidationResultBag>,
        IRequestHandler<ConfirmarEnvioEmailArquivosRequest, ValidationResultBag>,
        IRequestHandler<ReenviarEmailRequest, ValidationResultBag>,
        IRequestHandler<DeleteArquivosRequest, ValidationResultBag>,
        IRequestHandler<FilterArquivosHoleriteRequest, ValidationResultBag>,
        IRequestHandler<FilterArquivosPendentesHoleriteRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IArquivosService _arquivosService;
        private readonly IUploadCreateRegistrationService _uploadCreateRegistrationService;

        public ArquivosCommandHandler(IMapper mapper,
            IArquivosService arquivosService,
            IUploadCreateRegistrationService uploadCreateRegistrationService)
        {
            _mapper = mapper;
            _arquivosService = arquivosService;
            _uploadCreateRegistrationService = uploadCreateRegistrationService;
        }

        public async Task<ValidationResultBag> Handle(UploadFileRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                return ValidationResult;
            }

            var listaPessoas = await _uploadCreateRegistrationService.Create(_mapper.Map<FileDto>(request));

            ValidationResult.Data = _mapper.Map<List<PessoasDto>>(listaPessoas);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(CreateArquivosRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                return ValidationResult;
            }

            ArquivosDto? arquivo = _mapper.Map<ArquivosDto>(request);

            //var resultArquivo = await _arquivosService.Create(request.PessoasId, request);

            ValidationResult.Data = _mapper.Map<ArquivosResponse>(arquivo);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(FilterArquivosHoleriteRequest request, CancellationToken cancellationToken)
        {
            FilterArquivosHoleriteDto? filter = _mapper.Map<FilterArquivosHoleriteDto>(request);

            List<ArquivosDto> resultArquivo = await _arquivosService.GetPesquisarArquivos(filter);

            List<ArquivosResponse>? responses = _mapper.Map<List<ArquivosResponse>>(resultArquivo);
            responses.ForEach(r => r.MesExtenso = new DateTime(r.Created.Value.Year, (int)r.Mes, 1).ToString("MMMM/yyyy").ToUpper());

            ValidationResult.Data = responses;

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(FilterArquivosPendentesHoleriteRequest request, CancellationToken cancellationToken)
        {
            FilterArquivosHoleriteDto? filter = _mapper.Map<FilterArquivosHoleriteDto>(request);

            var resultArquivo = await _arquivosService.GetPesquisarArquivosPendentes(filter);

            ValidationResult.Data = _mapper.Map<List<ArquivosResponse>>(resultArquivo);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(UpdateArquivosRequest request, CancellationToken cancellationToken)
        {
            ArquivosDto? arquivo = _mapper.Map<ArquivosDto>(request);

            var resultArquivo = await _arquivosService.Update(arquivo);

            ValidationResult.Data = _mapper.Map<ArquivosResponse>(resultArquivo);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(PatchArquivosRequest request, CancellationToken cancellationToken)
        {
            ArquivosDto? arquivo = await _arquivosService.GetById(request.Id);

            if (arquivo == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }

            var patchArquivo = _mapper.Map<PatchArquivosRequest>(arquivo);

            request.PatchArquivos.ApplyTo(patchArquivo);

            _mapper.Map(patchArquivo, arquivo);

            var resultArquivo = await _arquivosService.Update(arquivo);

            ValidationResult.Data = _mapper.Map<ArquivosResponse>(resultArquivo);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(DeleteArquivosRequest request, CancellationToken cancellationToken)
        {
            var arquivo = await _arquivosService.GetById(request.Id);

            if (!request.IsValid()) return ValidationResult;

            if (arquivo == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }
            ValidationResult.Data = await _arquivosService.Delete(arquivo);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(ConfirmarEnvioEmailArquivosRequest request, CancellationToken cancellationToken)
        {
            List<ArquivosDto>? arquivo = _mapper.Map<List<ArquivosDto>>(request.Arquivos);

            var resultArquivo = await _arquivosService.ConfirmarEnvioEmail(arquivo);

            ValidationResult.Data = _mapper.Map<List<ArquivosResponse>>(resultArquivo);

            return ValidationResult;
        }
        
        public async Task<ValidationResultBag> Handle(ReenviarEmailRequest request, CancellationToken cancellationToken)
        {
            List<ArquivosDto>? listaArquivo = new List<ArquivosDto>();
            
            ArquivosDto arquivo = _mapper.Map<ArquivosDto>(request.Arquivos);

            listaArquivo.Add(arquivo);

            var resultArquivo = await _arquivosService.ConfirmarEnvioEmail(listaArquivo);
            string msgRetorno = string.Empty;
            if (resultArquivo != null)
                msgRetorno = "E-mail encaminhado com sucesso!!!";

            ValidationResult.Data = msgRetorno;

            return ValidationResult;
        }
    }
}
