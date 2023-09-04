using Holerite.Application.Commands.Controler.Validations;
using Holerite.Core.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Requests
{
    public class CreateLoginAuthRequest : Command
    {

        public Guid? EmpresasId { get; set; }
        public string? ServidorSMTP { get; set; }
        public int? Porta { get; set; }
        public bool? RequerSSL { get; set; }
        public bool? RequerTLS { get; set; }
        public bool? Autenticao { get; set; }
        public string? SenderNome { get; set; }
        public string? Password { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new CreateLoginAuthRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
