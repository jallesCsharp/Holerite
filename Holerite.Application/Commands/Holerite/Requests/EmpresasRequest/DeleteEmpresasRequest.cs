using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.EmpresasRequest
{
    public class DeleteEmpresasRequest : Command
    {
        public DeleteEmpresasRequest(Guid id)
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
