using FluentValidation;
using Holerite.Application.Commands.Controler.Requests;
using Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Validations
{
    public class ControleAcessosRequestValidation : AbstractValidator<CreateControleAcessosRequest>
    {
        public ControleAcessosRequestValidation()
        {

        }
    }
}
