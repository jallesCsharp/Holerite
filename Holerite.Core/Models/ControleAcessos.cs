using Holerite.Core.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Holerite.Core.Models
{
    public class ControleAcessos : BaseModel
    {
        [Key]
        public Guid? PerfilId { get; set; }
        [Key]
        public Guid? FuncionalidadesId { get; set; }
        public bool Ativar { get; set; }

        public virtual Funcionalidades? Funcionalidades { get; set; }
        public virtual Perfil? Perfil { get; set; }

    }
}
