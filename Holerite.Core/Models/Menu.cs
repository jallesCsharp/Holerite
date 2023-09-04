using Holerite.Core.Models.Base;

namespace Holerite.Core.Models
{
    public class Menu : BaseModel
    {
        public string? DescricaoMenu { get; set; }
        public string? Modulo { get; set; }

        public ICollection<SubMenu>? SubMenu { get; set; }

    }
}
