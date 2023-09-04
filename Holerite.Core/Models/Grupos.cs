using Holerite.Core.Models.Base;

namespace Holerite.Core.Models
{
    public class Grupos : BaseModel
    {
        public string? NomeGrupo { get; set; }
        public bool Ativo { get; set; }

        public ICollection<NivelAcessos>? NivelAcessos { get; set; }
    }
}
