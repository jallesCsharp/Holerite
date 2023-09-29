using Holerite.Application.Commands.Holerite.Validations;
using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.PessoasRequest
{
    public class CreatePessoasRequest : Command
    {
        public Guid? EmpresasId { get; set; }
        public Guid? ProfissoesId { get; set; }
        public string? Codigo { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }
        public DateTime? Nascimento { get; set; }
        public DateTime? Admissao { get; set; }
        public string? SalarioBase { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new PessoasRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
