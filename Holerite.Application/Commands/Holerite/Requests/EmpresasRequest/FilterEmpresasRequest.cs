using Holerite.Core.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Requests.EmpresasRequest
{
    public class FilterEmpresasRequest : Command
    {
        public Guid Id { get; set; }
        public string? Nome { get; set; }
    }
}
