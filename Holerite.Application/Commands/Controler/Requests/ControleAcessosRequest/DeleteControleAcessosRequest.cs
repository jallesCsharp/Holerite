using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest
{
    public class DeleteControleAcessosRequest : Command
    {
        public DeleteControleAcessosRequest(Guid id)
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
