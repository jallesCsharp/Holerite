using FluentValidation;
using Holerite.Application.Commands.Holerite.Requests.EmpresasRequest;


namespace Holerite.Application.Commands.Holerite.Validations
{
    public class EmpresasRequestValidation : AbstractValidator<CreateEmpresasRequest>
    {
        public EmpresasRequestValidation() { }
    }
}
