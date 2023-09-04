using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Dtos
{
    public class ControleAcessosDto
    {
        public Guid Id { get; set; }
        public Guid? FuncionalidadesId { get; set; }
        public Guid? PerfilId { get; set; }

        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public virtual FuncionalidadesDto? Funcionalidades { get; set; }

        public virtual PerfilDto? Perfil { get; set; }
    }
}
