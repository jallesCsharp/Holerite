using Holerite.Core.Dtos;
using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.PessoasRequest
{
    public class UpdatePessoasRequest : Command
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public Guid? EmpresasId { get; set; }
        public Guid? ProfissoesId { get; set; }
        public string? CodigoFolha { get; set; }
        public string? Cpf { get; set; }
        public string? Pis { get; set; }
        public string? Nome { get; set; }
        public string? Email { get; set; }
        public DateTime? Nascimento { get; set; }
        public DateTime? Admissao { get; set; }
        public string? SalarioBase { get; set; }

        public virtual ProfissoesDto? Profissoes { get; set; }
        public virtual EmpresasDto? Empresas { get; set; }
    }
}
