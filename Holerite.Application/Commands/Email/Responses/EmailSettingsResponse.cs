using Holerite.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Email.Responses
{
    public class EmailSettingsResponse
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public Guid? EmpresasId { get; set; }
        public string? ServidorSMTP { get; set; }
        public int? Porta { get; set; }
        public bool? RequerSSL { get; set; }
        public bool? RequerTLS { get; set; }
        public bool? Autenticao { get; set; }
        public string? SenderNome { get; set; }
        public string? Password { get; set; }

        public EmpresasDto? Empresas { get; set; }
    }
}
