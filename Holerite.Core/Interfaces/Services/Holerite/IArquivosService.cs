using Holerite.Core.Dtos;
using Microsoft.AspNetCore.Http;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public interface IArquivosService
    {
        Task<ArquivosDto?> GetById(Guid id);
        Task<IEnumerable<ArquivosDto?>> GetAll();
        Task<List<ArquivosDto>> Create(List<PessoasDto> listaPessoasDto, ArquivoDocumentosDto arquivoDto);
        Task<ArquivosDto> Update(ArquivosDto pArquivo);
        Task<List<ArquivosDto>> ConfirmarEnvioEmail(List<ArquivosDto> arquivosDto);
        Task<ArquivosDto?> Delete(ArquivosDto pArquivo);
        
        Task<List<ArquivosDto>> GetPesquisarArquivos(FilterArquivosHoleriteDto filter);
        Task<List<ArquivosDto>> GetPesquisarArquivosPendentes(FilterArquivosHoleriteDto filter);

        public string SaveFile(IFormFile formFile);
        public string SaveFileAs(IFormFile formFile, string fileName);
    }
}
