using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Extension;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Interfaces.Services.Holerite;

namespace Holerite.Core.Services.Holerite
{
    public class UploadCreateRegistrationService : IUploadCreateRegistrationService
    {
        private readonly IMapper _mapper;
        private readonly IArquivosRepository _repository;
        private readonly IEmpresasService _empresasService;
        private readonly IProfissoesService _profissoesService;
        private readonly IPessoasService _pessoasService;

        public UploadCreateRegistrationService(
            IArquivosRepository repository, 
            IEmpresasService empresasService,
            IProfissoesService profissoesService,
            IPessoasService pessoasService,
            IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
            _empresasService = empresasService;
            _profissoesService = profissoesService;
            _pessoasService = pessoasService;
        }

        public async Task<IEnumerable<PessoasDto>> Create(FileDto pFile)
        {
            List<PessoasDto> listaArquivo = new List<PessoasDto>();
            IEnumerable<PessoasDto>? listResult = null;
            Stream? streamFile = pFile.FormFile?.OpenReadStream();

            using (var reader = new StreamReader(streamFile))
            {
                var listaItens = reader.ReadToEnd().Split("\r\n");
                var listaCadastro = listaItens.ToList();
                listaCadastro.Remove(listaItens[0]);
                string[] lista = listaCadastro.ToArray();

                foreach (var item in lista)
                {
                    string[] itemCadastro = item.Split(";");
                    if (String.IsNullOrEmpty(item))
                        break;
                    try
                    {
                        listaArquivo.Add(new PessoasDto()
                        {
                            Cpf = itemCadastro[0].ToString().AsValidaSomenteNumerosCpf(),
                            Pis = itemCadastro[1].ToString().AsValidaSomenteNumerosCpf(),
                            Nome = itemCadastro[2].ToString(),
                            CodigoFolha = itemCadastro[3] == String.Empty ? 0 : Convert.ToInt32(itemCadastro[3]),
                            Email = itemCadastro[6].ToString(),
                            EmpresasId = await CadastrarEmpresa(new EmpresasDto()
                            {
                                NomeEmpresa = itemCadastro[4] == String.Empty ? null : itemCadastro[4],
                                Cnpj = null,
                                Email = null,
                            }),
                            ProfissoesId = await CadastrarProfissao(new ProfissoesDto()
                            {
                                NomeProfissao = itemCadastro[5] == String.Empty ? null : itemCadastro[5],
                            }),
                        });
                    }
                    catch (Exception eX)
                    {
                        throw new Exception(eX.Message);
                    }
                }
                listResult = await _pessoasService.CreateList(listaArquivo);
            }
            await _repository.UnitOfWork.Commit();
            return listResult;
        }

        private async Task<Guid?> CadastrarProfissao(ProfissoesDto profissoesDto)
        {
            if (String.IsNullOrEmpty(profissoesDto.NomeProfissao))
                return null;
            var teste = await _profissoesService.Create(profissoesDto);
            return teste.Id;
        }

        private async Task<Guid?> CadastrarEmpresa(EmpresasDto empresasDto)
        {
            if (String.IsNullOrEmpty(empresasDto.NomeEmpresa))
                return null;
            var teste = await _empresasService.CreateUpdate(empresasDto);
            return teste.Id;
        }
    }
}
