using Holerite.Core.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace Holerite.Core.Models
{
    public class Arquivos : BaseModel
    {
        [ForeignKey("Pessoas")]
        public Guid? PessoasId { get; set; }        
        public int? Mes { get; set; }
        public string? NomeArquivo { get; set; }
        public byte[]? Arquivo { get; set; }
        public bool? EmailEnviado { get; set; }

        public virtual Pessoas? Pessoas { get; set; }
    }
}
