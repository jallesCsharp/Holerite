using FluentValidation;
using Holerite.Application.Commands.Controler.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Validations
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
