
namespace Holerite.Core.Interfaces.Base;

public interface IBaseModel
{
    Guid Id { get; set; }
    DateTime? Created { get; set; }
    DateTime? Updated { get; set; }
    DateTime? Deleted { get; set; }
}
