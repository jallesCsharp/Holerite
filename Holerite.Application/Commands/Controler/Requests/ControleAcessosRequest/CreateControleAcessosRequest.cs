using Holerite.Application.Commands.Controler.Validations;
using Holerite.Application.Commands.Holerite.Validations;
using Holerite.Core.Dtos;
using Holerite.Core.Messages;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest
{
    public class CreateControleAcessosRequest : Command
    {
        public Guid Id { get; set; }
        public Guid? PerfilId { get; set; }
        public Guid? FuncionalidadesId { get; set; }
        public bool Ativar { get; set; }

        public virtual IEnumerable<ArquivoDocumentosDto>? ArquivoDocumentos { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new ControleAcessosRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
