using FluentValidation;
using Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Validations;

public class ProfissoesRequestValidation : AbstractValidator<CreateProfissoesRequest>
{
    public ProfissoesRequestValidation()
    {
        RuleFor(c => c.NomeProfissao)
            .NotEqual(string.Empty)
            .WithMessage("Campo Obrigatório Nome Profissão.");
    }
}
