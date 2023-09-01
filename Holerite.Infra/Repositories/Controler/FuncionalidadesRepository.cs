using AutoMapper;
using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Models;

namespace Holerite.Infra.Repositories.Controler
{
    public class FuncionalidadesRepository : BaseRepository<Funcionalidades>, IFuncionalidadesRepository
    {
        public FuncionalidadesRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }
    }
}
