using Holerite.Core.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest
{
    public class FilterProfissoesRequest : Command
    {
        public Guid Id { get; set; }
        public string? NomeProfissao { get; set; }
    }
}
