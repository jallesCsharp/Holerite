using Holerite.Application.Commands.Holerite.Validations;
using Holerite.Core.Messages;
using Microsoft.AspNetCore.Http;

namespace Holerite.Application.Commands.Holerite.Requests.ArquivosRequest
{
    public class UploadFileRequest : Command
    {
        public IFormFile? FormFile { get; set; }

        public override bool IsValid()
        {
            ValidationResult = new UploadFileRequestValidation().Validate(this);
            return ValidationResult.IsValid;
        }
    }
}
