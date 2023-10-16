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

    public Guid? EmpresasId { get; set; }
    public Guid? ProfissoesId { get; set; }
    public string? Codigo { get; set; }
    public string? Nome { get; set; }
    public string? Email { get; set; }
    public DateTime? Nascimento { get; set; }
    public DateTime? Admissao { get; set; }
    public string? SalarioBase { get; set; }

    public JsonPatchDocument<PatchPessoasRequest> PatchPessoas { get; }

    public PatchPessoasRequest(JsonPatchDocument<PatchPessoasRequest> patchPessoas)
    {
        PatchPessoas = patchPessoas;
    }

}
