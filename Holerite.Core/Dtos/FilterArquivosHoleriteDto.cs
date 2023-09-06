using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Dtos
{
    public class FilterArquivosHoleriteDto
    {
        public Guid Id { get; set; }
        public Guid PessoaId { get; set; }
        public string? Nome { get; set; }
        public int Mes { get; set; }
        public bool EmailEnviado { get; set; }
    }
}
