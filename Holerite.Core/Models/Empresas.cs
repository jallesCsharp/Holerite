using Holerite.Core.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Models
{
    public class Empresas : BaseModel
    {
        public string? NomeEmpresa { get; set; }
        public string? Cnpj { get; set; }
        public string? Email { get; set; }
    }
}
