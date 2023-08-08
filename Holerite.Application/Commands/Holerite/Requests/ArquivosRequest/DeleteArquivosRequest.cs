using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.ArquivosRequest
{
    public class DeleteArquivosRequest : Command
    {
        public DeleteArquivosRequest(Guid id)
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
