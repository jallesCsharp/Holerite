using FluentValidation;
using Holerite.Application.Commands.Email.Requests;

namespace Holerite.Application.Commands.Email.Validations
{
    public class EmailSettingsRequestValidation : AbstractValidator<CreateEmailSettingsRequest>
    {
        public EmailSettingsRequestValidation()
        {
            
        }
    }
}
