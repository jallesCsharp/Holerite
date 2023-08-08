
namespace Holerite.Core.Interfaces.Repositories;

public interface IUnitOfWork
{
    Task<bool> Commit();
    bool DatabaseExists();
}
