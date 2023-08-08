using MediatR;
using AutoMapper;
using System.Text;
using iText.Kernel.Pdf;
using Holerite.Core.Dtos;
using Holerite.Core.Messages;
using Holerite.Core.Validation;
using iText.Kernel.Pdf.Canvas.Parser;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Application.Commands.Holerite.Requests.ArquivoDocumentosRequest;
using Holerite.Application.Commands.Holerite.Responses.ArquivoDocumentosResponses;
using Microsoft.AspNetCore.Http;
using Holerite.Core.Dtos.ModeloHoleritePdfDto;
using Holerite.Application.Commands.Holerite.Responses.ArquivosResponses;

namespace Holerite.Application.Commands.Holerite.Handlers
{
    public class ArquivoDocumentosCommandHandler : CommandHandler,
        IRequestHandler<CreateArquivoDocumentosRequest, ValidationResultBag>,
        IRequestHandler<UpdateArquivoDocumentosRequest, ValidationResultBag>,
        IRequestHandler<DeleteArquivoDocumentosRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IArquivoDocumentosService _arquivoDocumentosService;
        private readonly IArquivosService _arquivosService;
        private readonly IPessoasService _pessoasService;

        public ArquivoDocumentosCommandHandler(IMapper mapper,
            IArquivoDocumentosService arquivoDocumentosService,
            IArquivosService arquivosService,
            IPessoasService pessoasService)
        {
            _mapper = mapper;
            _arquivoDocumentosService = arquivoDocumentosService;
            _arquivosService = arquivosService;
            _pessoasService = pessoasService;
        }

        public async Task<ValidationResultBag> Handle(CreateArquivoDocumentosRequest request, CancellationToken cancellationToken)
        {
            try
            {
                if (!request.IsValid())
                {
                    ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                    return ValidationResult;
                }

                ArquivoDocumentosDto resultArquivo = await _arquivoDocumentosService.Create(request.FormFile);
                List<PessoasDto> listaPessoasDto = (List<PessoasDto>)await _pessoasService.GetAll();
                List<ArquivosDto> listaArquivo = await _arquivosService.Create(listaPessoasDto, resultArquivo);
                var ty = _mapper.Map<List<ArquivosResponse>>(listaArquivo);
                ValidationResult.Data = ty;
            }
            catch (Exception error)
            {

                throw;
            }
            

            


            return ValidationResult;
        }


        public async Task<ValidationResultBag> Handle(UpdateArquivoDocumentosRequest request, CancellationToken cancellationToken)
        {
            ArquivoDocumentosDto? arquivo = _mapper.Map<ArquivoDocumentosDto>(request);

            var resultArquivo = await _arquivoDocumentosService.Update(arquivo);

            ValidationResult.Data = _mapper.Map<ArquivoDocumentosResponse>(resultArquivo);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(DeleteArquivoDocumentosRequest request, CancellationToken cancellationToken)
        {
            var arquivo = await _arquivoDocumentosService.GetById(request.Id);

            if (!request.IsValid()) return ValidationResult;

            if (arquivo == null)
            {
                AddError("Registro não existe.");
                return ValidationResult;
            }
            ValidationResult.Data = await _arquivoDocumentosService.Delete(arquivo);

            return ValidationResult;
        }
    }
}
