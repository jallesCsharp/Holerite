using AutoMapper;
using Holerite.Core.Models;
using Holerite.Core.Interfaces.Repositories.Holerite;

namespace Holerite.Infra.Repositories.Holerite
{
    public class ArquivosRepository : BaseRepository<Arquivos>, IArquivosRepository
    {
        public ArquivosRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }
    }
}
