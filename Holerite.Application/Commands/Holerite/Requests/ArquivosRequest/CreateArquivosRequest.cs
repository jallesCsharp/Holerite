using Holerite.Application.Commands.Holerite.Validations;
using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.ArquivosRequest
{
    public class CreateArquivosRequest : Command
    {
        public Guid Id { get; set; }

        public Guid? PessoasId { get; set; }
        public Guid? ArquivoDocumentoId { get; set; }
        public int? Mes { get; set; }
        public string? NomeArquivo { get; set; } 
        public byte[]? Arquivo { get; set; }
        public bool? EmailEnviado { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new ArquivosRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
