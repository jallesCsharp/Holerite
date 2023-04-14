using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.EmpresasRequest
{
    public class UpdateEmpresasRequest : Command
    {
        public Guid Id { get; set; }
        //public DateTime? Created { get; set; }
        //public DateTime? Updated { get; set; }
        //public DateTime? Deleted { get; set; }

        public string? NomeEmpresa { get; set; }
        public string? Cnpj { get; set; }
        public string? Email { get; set; }
    }
}
