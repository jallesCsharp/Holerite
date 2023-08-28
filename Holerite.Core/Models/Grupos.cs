using Holerite.Core.Models.Base;

namespace Holerite.Core.Models
{
    public class Grupos : BaseModel
    {
        public Grupos()
        {
            this.Funcionalidades = new HashSet<Funcionalidades>();
        }

        public string? NomeGrupo { get; set; }
        public bool Ativo { get; set; }

        public ICollection<Funcionalidades>? Funcionalidades { get; set; }
    }
}
