using Holerite.Core.Dtos;
using Holerite.Core.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Holerite.Requests.ArquivosRequest
{
    public class ReenviarEmailRequest : Command
    {
        public virtual ArquivosDto? Arquivos { get; set; }
    }
}
