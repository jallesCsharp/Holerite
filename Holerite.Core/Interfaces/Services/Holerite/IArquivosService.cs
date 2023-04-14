using Holerite.Core.Dtos;
using Microsoft.AspNetCore.Http;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public interface IArquivosService
    {
        Task<ArquivosDto?> GetById(Guid id);
        Task<IEnumerable<ArquivosDto?>> GetAll();
        Task<ArquivosDto> Create(ArquivosDto pArquivo);
        Task<ArquivosDto> Update(ArquivosDto pArquivo);
        Task<ArquivosDto?> Delete(ArquivosDto pArquivo);

        public string SaveFile(IFormFile formFile);
        public string SaveFileAs(IFormFile formFile, string fileName);
    }
}
