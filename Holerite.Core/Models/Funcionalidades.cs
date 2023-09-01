using Holerite.Core.Models.Base;

namespace Holerite.Core.Models
{
    public partial class Funcionalidades : BaseModel
    {
        public string? Menu { get; set; }
        public string? Modulo { get; set; }
        public bool Ativo { get; set; }
    }
}
