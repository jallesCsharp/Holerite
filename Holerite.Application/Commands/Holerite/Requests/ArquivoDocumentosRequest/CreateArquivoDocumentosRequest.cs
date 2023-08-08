using Holerite.Application.Commands.Holerite.Validations;
using Holerite.Core.Dtos;
using Holerite.Core.Messages;
using Microsoft.AspNetCore.Http;

namespace Holerite.Application.Commands.Holerite.Requests.ArquivoDocumentosRequest
{
    public class CreateArquivoDocumentosRequest : Command
    {
        public Guid Id { get; set; }

        public string? Nome { get; set; }
        public byte[]? Arquivo { get; set; }

        public IFormFile? FormFile { get; set; }

        public virtual IEnumerable<ArquivoDocumentosDto>? ArquivoDocumentos { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new ArquivoDocumentosRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
