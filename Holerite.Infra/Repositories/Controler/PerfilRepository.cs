using AutoMapper;
using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Models;

namespace Holerite.Infra.Repositories.Controler
{
    public class PerfilRepository : BaseRepository<Perfil>, IPerfilRepository
    {
        public PerfilRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }
    }
}
