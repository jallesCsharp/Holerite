using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Controler.Requests.PerfilRequest
{
    public class FilterPerfilRequest : Command
    {
        public Guid Id { get; set; }
        public string? NomePerfil { get; set; }
        public bool Ativo { get; set; }
    }
}
