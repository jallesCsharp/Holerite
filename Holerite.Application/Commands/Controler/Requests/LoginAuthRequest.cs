using Holerite.Application.Commands.Controler.Validations;
using Holerite.Core.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Requests
{
    public class LoginAuthRequest : Command
    {
        public string? LoginAuth { get; set; }
        public string? Password { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new LoginAuthRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
