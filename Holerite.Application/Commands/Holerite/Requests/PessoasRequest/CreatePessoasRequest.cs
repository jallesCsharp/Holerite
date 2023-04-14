using Holerite.Application.Commands.Holerite.Validations;
using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.PessoasRequest
{
    public class CreatePessoasRequest : Command
    {
        //public Guid Id { get; set; }
        //public DateTime? Created { get; set; }
        //public DateTime? Updated { get; set; }
        //public DateTime? Deleted { get; set; }

        public Guid EmpresaId { get; set; }
        public Guid ProfissaoId { get; set; }
        public int? Codigo { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new PessoasRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
