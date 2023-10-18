using Holerite.Core.Messages;
using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest
{
    public class PatchControleAcessosRequest : Command
    {
        public PatchControleAcessosRequest() { }

        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }
        public Guid? PerfilId { get; set; }
        public Guid? FuncionalidadesId { get; set; }
        public bool Ativar { get; set; }

        public JsonPatchDocument<PatchControleAcessosRequest> Patch { get; }

        public PatchControleAcessosRequest(JsonPatchDocument<PatchControleAcessosRequest> patch)
        {
            Patch = patch;
        }

    }
}
