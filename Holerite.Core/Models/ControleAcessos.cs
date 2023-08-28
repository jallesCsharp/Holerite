using Holerite.Core.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Models
{
    public class ControleAcessos : BaseModel
    {
        public ControleAcessos()
        {
            this.Funcionalidades = new HashSet<Funcionalidades>();
        }

        public ICollection<Funcionalidades>? Funcionalidades { get; set; }

    }
}
