using AutoMapper;
using Holerite.Core.Models;
using Holerite.Core.Interfaces.Repositories.Holerite;

namespace Holerite.Infra.Repositories.Holerite
{
    public class EmpresasRepository : BaseRepository<Empresas>, IEmpresasRepository
    { 
        public EmpresasRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }
    }
}
