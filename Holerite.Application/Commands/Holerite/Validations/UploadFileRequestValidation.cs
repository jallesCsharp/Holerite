using FluentValidation;
using Holerite.Application.Commands.Holerite.Requests.ArquivosRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Validations
{
    public class UploadFileRequestValidation : AbstractValidator<UploadFileRequest>
    {
        public UploadFileRequestValidation() { }
    }
}
