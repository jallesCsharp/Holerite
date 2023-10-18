using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest
{
    public class FilterControleAcessosRequest : Command
    {
        public Guid Id { get; set; }
        public Guid? PerfilId { get; set; }
        public Guid? FuncionalidadesId { get; set; }
        public bool Ativar { get; set; }
    }
}
