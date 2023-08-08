
namespace Holerite.Core.Dtos
{
    public class ArquivosDto
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public Guid? PessoasId { get; set; }
        public Guid? ArquivoDocumentoId { get; set; }
         public int? Mes { get; set; }
        public string? NomeArquivo { get; set; }
        public byte[]? Arquivo { get; set; }
        public bool? EmailEnviado { get; set; }

        public virtual PessoasDto? Pessoas { get; set; }
    }
}
