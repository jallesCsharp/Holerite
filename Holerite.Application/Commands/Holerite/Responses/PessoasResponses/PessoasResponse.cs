using Holerite.Core.Dtos;

namespace Holerite.Application.Commands.Holerite.Responses.PessoasResponses
{
    public class PessoasResponse
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public Guid? EmpresasId { get; set; }
        public Guid? ProfissoesId { get; set; }
        public int? Codigo { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }

        public virtual ProfissoesDto? Profissoes { get; set; }
        public virtual EmpresasDto? Empresas { get; set; }
    }
}
