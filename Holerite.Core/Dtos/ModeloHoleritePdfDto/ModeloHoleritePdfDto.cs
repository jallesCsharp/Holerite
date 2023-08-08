using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Dtos.ModeloHoleritePdfDto
{
    public class ModeloHoleritePdfDto
    {
        public Guid Id { get; set; }
        public Guid? PessoasId { get; set; }
        public Guid? ArquivoDocumentoId { get; set; }
        public int? Mes { get; set; }
        public DateTime? DTFolhaHolerite { get; set; }
        public string? NomeArquivo { get; set; }
        public string? Arquivo { get; set; }
        public bool? EmailEnviado { get; set; }

        public virtual PessoasDto? Pessoas { get; set; }
    }
}
