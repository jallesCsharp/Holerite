using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Controler.Requests.PerfilRequest
{
    public class DeletePerfilRequest : Command
    {
        public DeletePerfilRequest(Guid id)
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
