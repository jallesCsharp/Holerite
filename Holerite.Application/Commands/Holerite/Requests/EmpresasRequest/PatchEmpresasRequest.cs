using Holerite.Core.Messages;
using Microsoft.AspNetCore.JsonPatch;

namespace Holerite.Application.Commands.Holerite.Requests.EmpresasRequest
{
    public class PatchEmpresasRequest : Command
    {
        public PatchEmpresasRequest() { }

        public Guid Id { get; set; }
        //public DateTime? Created { get; set; }
        //public DateTime? Updated { get; set; }
        //public DateTime? Deleted { get; set; }

        public string? NomeEmpresa { get; set; }
        public string? Cnpj { get; set; }
        public string? Email { get; set; }

        public JsonPatchDocument<PatchEmpresasRequest> PatchEmpresas { get; }

        public PatchEmpresasRequest(JsonPatchDocument<PatchEmpresasRequest> patchEmpresas)
        {
            PatchEmpresas = patchEmpresas;
        }

    }
}
