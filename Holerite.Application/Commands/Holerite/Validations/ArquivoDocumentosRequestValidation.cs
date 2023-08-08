using FluentValidation;
using Holerite.Application.Commands.Holerite.Requests.ArquivoDocumentosRequest;

namespace Holerite.Application.Commands.Holerite.Validations
{
    public class ArquivoDocumentosRequestValidation : AbstractValidator<CreateArquivoDocumentosRequest>
    {
        public ArquivoDocumentosRequestValidation() { }
    }
}
