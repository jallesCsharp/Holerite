using Holerite.Application.Commands.Holerite.Validations;
using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.LoginRequest
{
    public class LoginAuthRequest : Command
    {
        public string Cpf { get; set; }
        public string? Password { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new LoginAuthRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
