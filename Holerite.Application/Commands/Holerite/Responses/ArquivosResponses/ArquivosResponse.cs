using Holerite.Core.Dtos;

namespace Holerite.Application.Commands.Holerite.Responses.ArquivosResponses
{
    public class ArquivosResponse
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public Guid? PessoasId { get; set; }
        public int? Mes { get; set; }
        public string? MesExtenso { get; set; }
        public string? NomeArquivo { get; set; }
        public byte[]? Arquivo { get; set; }
        public bool? EmailEnviado { get; set; }

        public virtual PessoasDto? Pessoas { get; set; }
    }
}
