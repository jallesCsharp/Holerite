using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Dtos
{
    public class FilterArquivoDocumentosDto
    {
        public Guid? Id { get; set; }
        public string? Nome { get; set; }
        public DateTime? DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
    }
}
