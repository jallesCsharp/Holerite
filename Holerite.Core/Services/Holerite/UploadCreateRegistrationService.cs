using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Extension;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Core.Interfaces.Services.Holerite;
using XUtilities.NetCore6.Seguranca;

namespace Holerite.Core.Services.Holerite
{
    public class UploadCreateRegistrationService : IUploadCreateRegistrationService
    {
        private readonly IMapper _mapper;
        private readonly IArquivosRepository _repository;
        private readonly IEmpresasService _empresasService;
        private readonly IProfissoesService _profissoesService;
        private readonly IPessoasService _pessoasService;
        private readonly IControlerService _controlerService;
        private readonly IPerfilService _perfilService;

        public UploadCreateRegistrationService(
            IArquivosRepository repository, 
            IEmpresasService empresasService,
            IProfissoesService profissoesService,
            IPessoasService pessoasService,
            IControlerService controlerService,
            IPerfilService perfilService,
            IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
            _empresasService = empresasService;
            _profissoesService = profissoesService;
            _pessoasService = pessoasService;
            _controlerService = controlerService;
            _perfilService = perfilService;
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

                if(lista.ToArray().Count() == 0)
                    throw new Exception("Arquivo não contem registros!!!");

                foreach (var item in lista)
                {
                    string[] itemCadastro = item.Split(";");
                    if (String.IsNullOrEmpty(item))
                        break;
                    //if (_pessoasService.GetLogin(itemCadastro[0].AsString().AsValidaSomenteNumerosCpf()) != null)
                    //    break;

                    try
                    {
                        listaArquivo.Add(new PessoasDto()
                        {
                            Cpf = itemCadastro[0].AsString().AsValidaSomenteNumerosCpf(),
                            Pis = itemCadastro[1].AsString().AsRetornarSomenteNumeros(),
                            Nome = itemCadastro[2].AsString(),
                            CodigoFolha = itemCadastro[3].ToString().AsValidaSomenteNumerosCodFolha(),
                            Email = itemCadastro[6].AsString(),
                            Nascimento = itemCadastro[7].AsDateTime(),
                            Admissao = itemCadastro[8].AsDateTime(),
                            SalarioBase = itemCadastro[9].ToString(),
                            EmpresasId = await CadastrarEmpresa(new EmpresasDto()
                            {
                                NomeEmpresa = itemCadastro[4] == String.Empty ? null : itemCadastro[4].AsString().ToUpper(),
                                Cnpj = null,
                                Email = null,
                            }),
                            ProfissoesId = await CadastrarProfissao(new ProfissoesDto()
                            {
                                NomeProfissao = itemCadastro[5] == String.Empty ? null : itemCadastro[5].AsString().ToUpper(),
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
            listResult.ToList().ForEach(async item => {
                await _controlerService.LoginCreate(new LoginAuthDto()
                {
                    LoginAuth = item.Cpf,
                    PerfilId = _perfilService.GetPerfil("EXETERNO").Result.Id,
                    PessoasId = item.Id,
                    UltimoLogin = DateTime.UtcNow,
                    Senha = XAesCrip.Criptografar(item.Cpf.AsString().Substring(0, 6)),                    
                    SecaoAtiva = false
                });

            });
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
