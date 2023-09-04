using Holerite.Core.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Models
{
    public class EmailSettings : BaseModel
    {
        [ForeignKey("Empresas")]
        public Guid? EmpresasId { get; set; }
        public string? ServidorSMTP { get; set; }
        public int? Porta { get; set; }
        public bool? RequerSSL { get; set; }
        public bool? RequerTLS { get; set; }
        public bool? Autenticao { get; set; }
        public string? SenderNome { get; set; }
        public string? Password { get; set; }
        
        public virtual Empresas? Empresas { get; set; }
    }
}
