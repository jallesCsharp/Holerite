using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.PessoasRequest
{
    public class DeletePessoasRequest : Command
    {
        public DeletePessoasRequest(Guid id)
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
