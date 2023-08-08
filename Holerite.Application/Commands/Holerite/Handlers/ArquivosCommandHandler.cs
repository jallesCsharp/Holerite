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
        //IRequestHandler<CreateArquivosRequest, ValidationResultBag>,
        IRequestHandler<PatchArquivosRequest, ValidationResultBag>,
        IRequestHandler<UpdateArquivosRequest, ValidationResultBag>,
        IRequestHandler<DeleteArquivosRequest, ValidationResultBag>
        //IRequestHandler<UploadFileRequest, ValidationResultBag>
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

        //public async Task<ValidationResultBag> Handle(UploadFileRequest request, CancellationToken cancellationToken)
        //{
        //    if (!request.IsValid())
        //    {
        //        ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
        //        return ValidationResult;
        //    }

        //    var arquivos = request;

        //    await _uploadCreateRegistrationService.Create(_mapper.Map<FileDto>(request));

        //    using (var writer = new StringWriter())
        //    {
        //        var teste = writer.NewLine;
        //    }


        //    ArquivosDto? arquivo = _mapper.Map<ArquivosDto>(request);

        //    ValidationResult.Data = _mapper.Map<ArquivosResponse>(resultArquivo);

        //    return ValidationResult;
        //}
        
        //public async Task<ValidationResultBag> Handle(CreateArquivosRequest request, CancellationToken cancellationToken)
        //{
        //    if (!request.IsValid())
        //    {
        //        ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
        //        return ValidationResult;
        //    }

        //    ArquivosDto? arquivo = _mapper.Map<ArquivosDto>(request);

        //    var resultArquivo = await _arquivosService.Create(arquivo);

        //    ValidationResult.Data = _mapper.Map<ArquivosResponse>(resultArquivo);

        //    return ValidationResult;
        //}

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
    }
}
