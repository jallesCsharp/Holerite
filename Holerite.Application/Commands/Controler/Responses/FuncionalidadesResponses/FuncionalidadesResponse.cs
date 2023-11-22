using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Responses.FuncionalidadesResponses
{
    public class FuncionalidadesResponse
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public string? Menu { get; set; }
        public string? Modulo { get; set; }
        public bool Ativo { get; set; }

    }
}
