using Holerite.Core.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;

public class DeleteProfissoesRequest : Command
{
    public DeleteProfissoesRequest(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; private set; }

    public override bool IsValid()
    {
        return Guid.Empty != Id;
    }
}
