using Holerite.Core.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Holerite.Core.Models
{
    public partial class NivelAcessos : BaseModel
    {
        [ForeignKey("Grupos")]
        public Guid? GruposId { get; set; }
        [ForeignKey("Menu")]
        public Guid? MenuId { get; set; }        
        public bool Visualizar { get; set; }
        public bool Editar { get; set; }
        public bool Deletar { get; set; }
        public bool Alterar { get; set; }
        public bool Salvar { get; set; }
        public virtual Menu? Menu { get; set; }

        public virtual Grupos? Grupos { get; set; }
    }
}
