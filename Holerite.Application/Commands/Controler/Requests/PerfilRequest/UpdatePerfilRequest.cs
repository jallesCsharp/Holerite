using Holerite.Core.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Requests.PerfilRequest
{
    public class UpdatePerfilRequest : Command
    {
        public Guid Id { get; set; }
        public string? NomePerfil { get; set; }
        public bool Ativo { get; set; }
    }
}
