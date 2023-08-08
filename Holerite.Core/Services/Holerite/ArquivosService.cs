using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Extension.ModeloHolerite;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Holerite.Core.Services.Holerite
{
    public class ArquivosService : IArquivosService
    {
        private readonly IMapper _mapper;
        private readonly IArquivosRepository _repository;

        public ArquivosService(IArquivosRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        private static byte[] FileToBytes(IFormFile formFile)
        {
            using var ms = new MemoryStream();
            formFile.CopyTo(ms);
            return ms.ToArray();
        }

        private string Upload(byte[] fileBytes, string name)
        {
            return "" == string.Empty ? string.Empty : "";
        }

        public string SaveFile(IFormFile formFile)
        {
            return Upload(FileToBytes(formFile), $"{Guid.NewGuid()}{Path.GetExtension(formFile.FileName)}");
        }

        public string SaveFileAs(IFormFile formFile, string fileName)
        {
            return Upload(FileToBytes(formFile), fileName);
        }

        public async Task<IEnumerable<ArquivosDto?>> GetAll()
        {
            var arquivos = await _repository
                .QueryableFor()
                .ToListAsync();
            return _mapper.Map<IEnumerable<ArquivosDto>>(arquivos);
        }

        public async Task<ArquivosDto?> GetById(Guid id)
        {
            var arquivo = await _repository
                .QueryableFor(p => p.Id == id)
                .FirstOrDefaultAsync();
            return _mapper.Map<ArquivosDto>(arquivo);
        }

        public async Task<List<ArquivosDto>> Create(List<PessoasDto> listaPessoasDto, ArquivoDocumentosDto arquivoDto)
        {
            List<ArquivosDto> listaHolerite = await XModelo1.ModeloHolerite(listaPessoasDto, arquivoDto);

            List<Arquivos> listaArquivo = _mapper.Map<List<Arquivos>>(listaHolerite);
            var resultArquivo = _repository.AddRange(listaArquivo);
            await _repository.UnitOfWork.Commit();


            return _mapper.Map<List<ArquivosDto>>(resultArquivo);
        }

        public async Task<ArquivosDto> Update(ArquivosDto arquivoDto)
        {
            var arquivo = _mapper.Map<Arquivos>(arquivoDto);
            var resultArquivo = _repository.Update(arquivo);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<ArquivosDto>(resultArquivo);
        }

        public async Task<ArquivosDto?> Delete(ArquivosDto arquivoDto)
        {
            var arquivo = _mapper.Map<Arquivos>(arquivoDto);
            var resultArquivo = _repository?.Remove(arquivo);
            return await Task.FromResult(_mapper.Map<ArquivosDto>(resultArquivo));
        }
    }
}
