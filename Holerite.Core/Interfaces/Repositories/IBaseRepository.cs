using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Interfaces.Repositories
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        IUnitOfWork UnitOfWork { get; }
        TEntity Add(TEntity entity);
        TEntity AddUpdate(TEntity entity, bool novo);
        IEnumerable<TEntity> AddRange(List<TEntity> entity);
        TEntity FindById(params object[] keyValues);
        TEntity Update(TEntity entity);
        TEntity Remove(TEntity entity);
        IQueryable<TEntity> QueryableFilter();
        IQueryable<TEntity> QueryableFor(Expression<Func<TEntity, bool>> criteria = null, bool @readonly = false, params Expression<Func<TEntity, object>>[] includes);
    }
}
