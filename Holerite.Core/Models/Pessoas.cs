using Holerite.Core.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Models
{
    public class Pessoas : BaseModel
    {
        public Guid EmpresaId { get; set; }
        public Guid ProfissaoId { get; set; }
        public int? Codigo { get; set; }
        public string? Nome { get; set; }
    }
}
