using FluentValidation;
using Holerite.Application.Commands.Controler.Requests.PerfilRequest;

namespace Holerite.Application.Commands.Controler.Validations
{
    public class PerfilRequestValidation : AbstractValidator<CreatePerfilRequest>
    {
        public PerfilRequestValidation()
        {

        }
    }
}
