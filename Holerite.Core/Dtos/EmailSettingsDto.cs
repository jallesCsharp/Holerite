using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Dtos
{
    public class EmailSettingsDto
    {
        public Guid? Id { get; set; }
        public Guid? EmpresasId { get; set; }
        public string? ServidorSMTP { get; set; }
        public int Porta { get; set; }
        public bool RequerSSL { get; set; }
        public bool RequerTLS { get; set; }
        public bool Autenticao { get; set; }
        public string? SenderNome { get; set; }
        public string? Password { get; set; }

        public virtual EmpresasDto? Empresas { get; set; }
    }
}
