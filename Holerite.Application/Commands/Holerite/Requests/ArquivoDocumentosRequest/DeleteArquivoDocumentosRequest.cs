using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.ArquivoDocumentosRequest
{
    public class DeleteArquivoDocumentosRequest : Command
    {
        public DeleteArquivoDocumentosRequest(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; private set; }

        public override bool IsValid()
        {
            return Guid.Empty != Id;
        }
    }
}
