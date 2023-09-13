using Holerite.Core.Dtos;
using Holerite.Core.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Requests.ArquivosRequest
{
    public class FilterArquivosHoleriteRequest : Command
    {
        public Guid? Id { get; set; }
        public Guid? PessoaId { get; set; }
        public string? Nome { get; set; }
        public int Mes { get; set; }
        public bool EmailEnviado { get; set; }
    }
}
