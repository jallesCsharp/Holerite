using Holerite.Core.Messages;
using Microsoft.AspNetCore.JsonPatch;

namespace Holerite.Application.Commands.Holerite.Requests.PessoasRequest;
public class PatchPessoasRequest : Command
{
    public PatchPessoasRequest() { }

    public Guid Id { get; set; }
    //public DateTime? Created { get; set; }
    //public DateTime? Updated { get; set; }
    //public DateTime? Deleted { get; set; }

    public Guid EmpresaId { get; set; }
    public Guid ProfissaoId { get; set; }
    public int? Codigo { get; set; }
    public string? Nome { get; set; }
    public string? Email { get; set; }

    public JsonPatchDocument<PatchPessoasRequest> PatchPessoas { get; }

    public PatchPessoasRequest(JsonPatchDocument<PatchPessoasRequest> patchPessoas)
    {
        PatchPessoas = patchPessoas;
    }

}
