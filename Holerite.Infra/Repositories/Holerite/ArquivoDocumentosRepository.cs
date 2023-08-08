using AutoMapper;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Models;

namespace Holerite.Infra.Repositories.Holerite
{
    public class ArquivoDocumentosRepository : BaseRepository<ArquivoDocumentos>, IArquivoDocumentosRepository
    {
        public ArquivoDocumentosRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }
    }
}
