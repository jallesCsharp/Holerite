using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Dtos
{
    public class ArquivoDocumentosDto
    {
        public Guid Id { get; set; }
        public string? Nome { get; set; }
        public byte[]? Arquivo { get; set; }

        public virtual IEnumerable<ArquivosDto>? Arquivos { get; set; }
    }
}
