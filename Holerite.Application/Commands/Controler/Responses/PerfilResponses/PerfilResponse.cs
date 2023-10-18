using Holerite.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Responses.PerfilResponses
{
    public class PerfilResponse
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public string? NomePerfil { get; set; }
        public bool Ativo { get; set; }

        public ICollection<ControleAcessosDto>? ControleAcessos { get; set; }

    }
}
