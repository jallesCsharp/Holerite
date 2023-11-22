using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Controler.Requests.FuncionalidadesRequest
{
    public class FilterFuncionalidadesRequest : Command
    {
        public Guid Id { get; set; }
        public string? Menu { get; set; }
        public string? Modulo { get; set; }
        public string? NomePerfil { get; set; }
        public bool Ativo { get; set; }
    }
}
