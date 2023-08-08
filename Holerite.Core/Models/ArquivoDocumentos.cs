using Holerite.Core.Models.Base;

namespace Holerite.Core.Models
{
    public class ArquivoDocumentos : BaseModel
    {   
        public string? Nome { get; set; }
        public byte[]? Arquivo { get; set; }

        public virtual IEnumerable<Arquivos>? Arquivos { get; set; }
    }
}
