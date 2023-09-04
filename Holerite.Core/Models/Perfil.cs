using Holerite.Core.Models.Base;

namespace Holerite.Core.Models
{
    public class Perfil : BaseModel
    {
        public Perfil()
        {
            ControleAcessos = new HashSet<ControleAcessos>();
        }

        public string? NomePerfil { get; set; }
        public bool Ativo { get; set; }

        public ICollection<ControleAcessos>? ControleAcessos { get; set; }
    }
}
