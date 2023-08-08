using AutoMapper;
using Holerite.Core.Models;
using Holerite.Core.Interfaces.Repositories.Holerite;

namespace Holerite.Infra.Repositories.Holerite
{
    public class ProfissoesRepository : BaseRepository<Profissoes>, IProfissoesRepository
    {
        public ProfissoesRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }
    }
}
