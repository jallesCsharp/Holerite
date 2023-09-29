using Holerite.Core.Dtos;
using Holerite.Core.Dtos.ModeloHoleritePdfDto;
using Microsoft.AspNetCore.Http;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public interface IArquivoDocumentosService
    {
        Task<IEnumerable<ArquivoDocumentosDto?>> GetFilter(FilterArquivoDocumentosDto filter);
        Task<ArquivoDocumentosDto?> GetById(Guid id);
        Task<IEnumerable<ArquivoDocumentosDto?>> GetAll();
        Task<ArquivoDocumentosDto> Create(IFormFile? pFile);
        Task<ArquivoDocumentosDto> Update(ArquivoDocumentosDto pArquivo);
        Task<ArquivoDocumentosDto?> Delete(ArquivoDocumentosDto pArquivo);
    }
}
