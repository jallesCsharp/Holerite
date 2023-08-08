using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Dtos.ModeloHoleritePdfDto;
using Holerite.Core.Extension.ModeloHolerite;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Holerite.Core.Services.Holerite
{
    public class ArquivoDocumentosService : IArquivoDocumentosService
    {
        private readonly IMapper _mapper;
        private readonly IArquivoDocumentosRepository _repository;

        public ArquivoDocumentosService(IArquivoDocumentosRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ArquivoDocumentosDto?>> GetAll()
        {
            var arquivos = await _repository
                .QueryableFor()
                .ToListAsync();
            return _mapper.Map<IEnumerable<ArquivoDocumentosDto>>(arquivos);
        }

        public async Task<ArquivoDocumentosDto?> GetById(Guid id)
        {
            var arquivo = await _repository
                .QueryableFor(p => p.Id == id)
                .FirstOrDefaultAsync();
            return _mapper.Map<ArquivoDocumentosDto>(arquivo);
        }

        public async Task<ArquivoDocumentosDto> Create(IFormFile? pFile)
        {
            try
            {
                ArquivoDocumentos arquivo = new ArquivoDocumentos();
                using (var ms = new MemoryStream())
                {
                    pFile.CopyTo(ms);
                    arquivo.Arquivo = ms.ToArray();
                    arquivo.Nome = pFile.FileName;
                };
                var resultArquivo = _repository.Add(arquivo);
                await _repository.UnitOfWork.Commit();
                ArquivoDocumentosDto documentosDto = _mapper.Map<ArquivoDocumentosDto>(resultArquivo);
                return documentosDto;
            }
            catch (Exception eX)
            {
                throw new Exception(eX.Message);
            }
        }

        public async Task<ArquivoDocumentosDto> Update(ArquivoDocumentosDto arquivoDto)
        {
            var arquivo = _mapper.Map<ArquivoDocumentos>(arquivoDto);
            var resultArquivo = _repository.Update(arquivo);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<ArquivoDocumentosDto>(resultArquivo);
        }

        public async Task<ArquivoDocumentosDto?> Delete(ArquivoDocumentosDto arquivoDto)
        {
            var arquivo = _mapper.Map<ArquivoDocumentos>(arquivoDto);
            var resultArquivo = _repository?.Remove(arquivo);
            return await Task.FromResult(_mapper.Map<ArquivoDocumentosDto>(resultArquivo));
        }
    }
}
