using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Dtos
{
    public class LoginAuthDto
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public Guid? PessoasId { get; set; }
        public Guid? PerfilId { get; set; }
        public string? LoginAuth { get; set; }
        public string? Senha { get; set; }
        public bool SecaoAtiva { get; set; }
        public TimeSpan? TimeSpira { get; set; }
        public DateTime? UltimoLogin { get; set; }
        public string? Jwt { get; set; }

        public virtual PessoasDto? Pessoas { get; set; }
        public virtual PerfilDto? Perfil { get; set; }

        public IList<FuncionalidadesResponseDto>? Funcionalidades { get; set; }
    }
}
