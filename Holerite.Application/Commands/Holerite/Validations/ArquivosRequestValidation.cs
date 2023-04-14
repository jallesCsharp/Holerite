using FluentValidation;
using Holerite.Application.Commands.Holerite.Requests.ArquivosRequest;
using System;

namespace Holerite.Application.Commands.Holerite.Validations
{
    public class ArquivosRequestValidation : AbstractValidator<CreateArquivosRequest>
    {
        public ArquivosRequestValidation() { }
    }
}
