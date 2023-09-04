using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Dtos
{
    public class PerfilDto
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
