using Holerite.Core.Messages;
using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;

public class PatchProfissoesRequest : Command
{
    public PatchProfissoesRequest() { }

    public Guid Id { get; set; }
    //public DateTime? CreatedAt { get; set; }
    //public DateTime? UpdatedAt { get; set; }
    public string? NomeProfissao { get; set; }

    public JsonPatchDocument<PatchProfissoesRequest> PatchProfissoes { get; }

    public PatchProfissoesRequest(JsonPatchDocument<PatchProfissoesRequest> patchProfissoes)
    {
        PatchProfissoes = patchProfissoes;
    }

}
