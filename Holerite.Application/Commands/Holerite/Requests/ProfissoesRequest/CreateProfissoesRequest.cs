using Holerite.Application.Commands.Holerite.Validations;
using Holerite.Core.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;
public class CreateProfissoesRequest : Command
{
    public string? NomeProfissao { get; set; }

    public override bool IsValid()
    {
        ValidationResult = new ProfissoesRequestValidation().Validate(this);
        return ValidationResult.IsValid;
    }
}
