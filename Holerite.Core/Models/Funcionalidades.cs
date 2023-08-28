using Holerite.Core.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Holerite.Core.Models
{
    public partial class Funcionalidades : BaseModel
    {
        [ForeignKey("ControleAcessos")]
        public Guid? ControleAcessosId { get; set; }
        [ForeignKey("Grupos")]
        public Guid? GruposId { get; set; }
        public string? Descricao { get; set; }
        public string? Modulo { get; set; }
        public bool Ativo { get; set; }

        public virtual Grupos? Grupos { get; set; }
        public virtual ControleAcessos? ControleAcessos { get; set; }
    }
}
