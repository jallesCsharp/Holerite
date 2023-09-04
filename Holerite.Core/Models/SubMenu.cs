using Holerite.Core.Models.Base;

namespace Holerite.Core.Models
{
    public class SubMenu : BaseModel
    {
        public Guid? MenuId { get; set; }
        public string? DescricaoMenu { get; set; }
        public string? Modulo { get; set; }

        public virtual Menu? Menu { get; set; }
        
    }
}
