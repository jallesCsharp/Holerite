using Holerite.Core.Dtos;

namespace Holerite.Application.Commands.Holerite.Responses.ArquivoDocumentosResponses
{
    public class ArquivoDocumentosResponse
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public string? Nome { get; set; }
        public byte[]? Arquivo { get; set; }

        public virtual IEnumerable<ArquivoDocumentosDto>? ArquivoDocumentos { get; set; }
    }
}
