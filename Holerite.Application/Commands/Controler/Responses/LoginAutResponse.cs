using Holerite.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Responses
{
    public class LoginAutResponse
    {
        public Guid Id { get; set; }
        public Guid PessoasId { get; set; }
        public string? NomeUsuario { get; set; }
        public string? Jwt { get; set; }
        public IList<FuncionalidadesResponseDto>? Funcionalidades { get; set; }
    }
}
