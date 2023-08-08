using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest
{
    public class UpdateProfissoesRequest : Command
    {
        public Guid Id { get; set; }
        //public DateTime? Created { get; set; }
        //public DateTime? Updated { get; set; }
        //public DateTime? Deleted { get; set; }
        public string? NomeProfissao { get; set; }
    }
}
