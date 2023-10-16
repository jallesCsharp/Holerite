using FluentValidation;
using Holerite.Application.Commands.Holerite.Requests.PessoasRequest;

namespace Holerite.Application.Commands.Holerite.Validations
{
    public class PessoasRequestValidation : AbstractValidator<CreatePessoasRequest>
    {
        public PessoasRequestValidation()
        {
            RuleFor(c => c.Cpf)
                .NotEmpty()
                .WithMessage("Campo Obrigatório Código.");

            RuleFor(c => c.Nome)
                .NotEqual(string.Empty)
                .WithMessage("Campo Obrigatório Nome.");
        }
    }
}

