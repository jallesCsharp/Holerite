using Holerite.Application.Commands.Controler.Validations;
using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Controler.Requests.PerfilRequest
{
    public class CreatePerfilRequest : Command
    {
        public Guid Id { get; set; }
        public string? NomePerfil { get; set; }
        public bool Ativo { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new PerfilRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
