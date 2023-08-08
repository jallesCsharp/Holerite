using Holerite.Core.Dtos;
using Holerite.Core.Messages;

namespace Holerite.Application.Commands.Holerite.Requests.ArquivoDocumentosRequest
{
    public class UpdateArquivoDocumentosRequest : Command
    {
        public Guid Id { get; set; }
        public string? Nome { get; set; }
        public byte[]? Arquivo { get; set; }

        public virtual IEnumerable<ArquivoDocumentosDto>? ArquivoDocumentos { get; set; }
    }
}
