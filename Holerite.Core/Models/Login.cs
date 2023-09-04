using Holerite.Core.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Models
{
    public class Login : BaseModel
    {
        [ForeignKey("Pessoas")]
        public Guid? PessoasId { get; set; }
        [ForeignKey("ControleAcessos")]
        public Guid? ControleAcessosId { get; set; }

        public string? LoginAuth { get; set; }
        public string? Senha { get; set; }
        public bool SecaoAtiva { get; set; }
        public TimeSpan? TimeSpira { get; set; }
        public DateTime? UltimoLogin { get; set; }
        public string? Jwt { get; set; }

        public virtual Pessoas? Pessoas { get; set; }
        public virtual ControleAcessos? ControleAcessos { get; set; }
    }

    //    id   
    //    senha
    //    secaoAtiva
    //    timeSpira
    //    ultimoLogin
    //    jwt
}
