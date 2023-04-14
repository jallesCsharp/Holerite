using Holerite.Core.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Holerite.Core.Models
{
    public class Pessoas : BaseModel
    {
        [ForeignKey("Empresa")]
        public Guid EmpresaId { get; set; }
        [ForeignKey("Profissao")]
        public Guid ProfissaoId { get; set; }
        public int? Codigo { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }

        public virtual Profissoes? Profissoes { get; set; }
        public virtual Empresas? Empresas { get; set; }
    }
}
