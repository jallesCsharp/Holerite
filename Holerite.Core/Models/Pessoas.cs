using Holerite.Core.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Holerite.Core.Models
{
    public class Pessoas : BaseModel
    {
        [ForeignKey("Empresas")]
        public Guid? EmpresasId { get; set; }
        [ForeignKey("Profissoes")]
        public Guid? ProfissoesId { get; set; }
        public int? CodigoFolha { get; set; }
        public string? Cpf { get; set; }
        public string? Pis { get; set; }        
        public string? Nome { get; set; }
        public string? Email { get; set; }

        public virtual Profissoes? Profissoes { get; set; }
        public virtual Empresas? Empresas { get; set; }
    }
}