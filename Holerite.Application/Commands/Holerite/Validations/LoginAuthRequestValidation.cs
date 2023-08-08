using FluentValidation;
using Holerite.Application.Commands.Holerite.Requests.LoginRequest;

namespace Holerite.Application.Commands.Holerite.Validations
{
    public class LoginAuthRequestValidation : AbstractValidator<LoginAuthRequest>
    {
        public LoginAuthRequestValidation()
        {
            RuleFor(x => x.Cpf)
                .NotEmpty()
                .WithMessage("Cpf Campo Obrigatório.");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Senha Campo Obrigatório.");
        }
    }
}
