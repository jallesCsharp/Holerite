using AutoMapper;
using Holerite.Core.Models;
using Holerite.Core.Interfaces.Repositories.Holerite;

namespace Holerite.Infra.Repositories.Holerite
{
    public class PessoasRepository : BaseRepository<Pessoas>, IPessoasRepository
    {
        public PessoasRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }
    }
}
