using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Extension.ModeloHolerite;
using Holerite.Core.Interfaces.Repositories.Email;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Interfaces.Services.EmailSMTP;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Holerite.Core.Services.Holerite
{
    public class ArquivosService : IArquivosService
    {
        private readonly IMapper _mapper;
        private readonly IArquivosRepository _repository;
        private readonly IEmailSettingsRepository _emailSettingsRepository;
        private readonly IEmailSMTPService _emailSMTPService;

        public ArquivosService(IArquivosRepository repository, IEmailSettingsRepository emailSettingsRepository, IEmailSMTPService emailSMTPService, IMapper mapper)
        {
            _repository = repository;
            _emailSettingsRepository = emailSettingsRepository;
            _emailSMTPService = emailSMTPService;
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

        public async Task<List<ArquivosDto>> GetPesquisarArquivos(FilterArquivosHoleriteDto filter)
        {
            List<Arquivos> lista = new List<Arquivos>();

            lista.AddRange(await _repository.QueryableFilter()
                .Include(pX => pX.ArquivoDocumento)
                .Include(pX => pX.Pessoas)
                .ThenInclude(pX => pX.Empresas)
                .OrderByDescending(pX => pX.Created)
                .OrderByDescending(pX => pX.Mes)
                .ToListAsync());

            if (!filter.Id.Equals(Guid.Empty))
                lista = lista
                    .Where(p => p.Id == filter.Id)
                    .OrderByDescending(pX => pX.Created)
                    .OrderByDescending(pX => pX.Mes)
                    .ToList();

            if (!filter.Mes.Equals(0))
                lista = lista
                    .Where(p => p.Mes == filter.Mes)
                    .OrderByDescending(pX => pX.Created)
                    .OrderByDescending(pX => pX.Mes)
                    .ToList();

            if (!filter.PessoaId.Equals(Guid.Empty))
            {
                lista = new List<Arquivos>();
                lista.AddRange(await _repository.QueryableFilter()
                    .Where(p => p.PessoasId == filter.PessoaId)
                    .Include(pX => pX.ArquivoDocumento)
                    .Include(pX => pX.Pessoas)
                    .ThenInclude(pX => pX.Empresas)
                    .OrderByDescending(pX => pX.Created)
                    .OrderByDescending(pX => pX.Mes)
                    .ToListAsync());
            }

            return _mapper.Map<List<ArquivosDto>>(lista);
        }
        
        public async Task<List<ArquivosDto>> GetPesquisarArquivosPendentes(FilterArquivosHoleriteDto filter)
        {
            List<Arquivos> lista = new List<Arquivos>();

            if (!filter.EmailEnviado)
                lista = await _repository.QueryableFilter()
                    .Include(pX => pX.ArquivoDocumento)
                    .Include(pX => pX.Pessoas)
                    .ThenInclude(pX => pX.Empresas)
                    .Where(pX => pX.EmailEnviado == false)
                    .ToListAsync();
            
                return _mapper.Map<List<ArquivosDto>>(lista);
        }

        public async Task<List<ArquivosDto>> ConfirmarEnvioEmail(List<ArquivosDto> arquivosDto)
        {
            try
            {
                List<ArquivosDto> listaAtualizada = new List<ArquivosDto>();

                //arquivosDto.AsParallel().ForAll(async arquivo =>
                arquivosDto.ForEach(async arquivo =>
                {
                    var idEmpresa = arquivo?.Pessoas?.EmpresasId;

                    EmailSettingsDto? emailSettingsDto = _mapper.Map<EmailSettingsDto>(_emailSettingsRepository.QueryableFor(pX => pX.EmpresasId == idEmpresa).FirstOrDefault());

                    var extensoMes = new DateTime(DateTime.Now.Year, (int)arquivo.Mes, DateTime.Now.Day).ToString("MMMM").ToUpper();

                    string Assunto = $"ENC: Contracheque do mês de {extensoMes} - {arquivo?.Pessoas?.Nome}";

                    string displayName = "Departamento Pessoal";

                    string body = $"Segue anexo o contracheque de competência o mês de {arquivo?.Mes.Value.ToString("00")}/{arquivo.Created.Value.Year}.";

                    var emailEnviado = await _emailSMTPService.EnvioEmail(emailSettingsDto, displayName, arquivo?.Pessoas?.Empresas?.Email, arquivo?.Pessoas?.Email, Convert.ToBase64String(arquivo.Arquivo), Assunto, body);
                    if (emailEnviado)
                    {
                        var arquivoModel = _mapper.Map<Arquivos>(arquivo);
                        arquivoModel.Pessoas = null;
                        arquivoModel.EmailEnviado = emailEnviado;
                        var resultArquivo = _repository.Update(arquivoModel);
                        _repository?.UnitOfWork.Commit();
                        listaAtualizada.Add(_mapper.Map<ArquivosDto>(resultArquivo));
                    }
                });

                return _mapper.Map<List<ArquivosDto>>(listaAtualizada);
            }
            catch (Exception eX)
            {
                throw new Exception(eX.Message);
            }
        }
    }
}
