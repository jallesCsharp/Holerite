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
        [ForeignKey("Grupos")]
        public Guid? GruposId { get; set; }
        public virtual Grupos? Grupos { get; set; }

    }
}
