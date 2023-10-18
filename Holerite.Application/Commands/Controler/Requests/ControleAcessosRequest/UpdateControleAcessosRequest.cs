using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest
{
    public class UpdateControleAcessosRequest : Command
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }
        public Guid? PerfilId { get; set; }
        public Guid? FuncionalidadesId { get; set; }
        public bool Ativar { get; set; }
    }
}
