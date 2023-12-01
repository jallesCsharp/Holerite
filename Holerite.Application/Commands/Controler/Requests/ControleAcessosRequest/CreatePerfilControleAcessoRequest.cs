using Holerite.Core.Dtos;
using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest
{
    public class CreatePerfilControleAcessoRequest : Command
    {
        public PerfilDto? Perfil { get; set; }
        public IList<FuncionalidadesDto>? Funcionalidades { get; set; }
    }
}
