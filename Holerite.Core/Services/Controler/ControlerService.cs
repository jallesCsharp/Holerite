using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Interfaces.Repositories.Email;
using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Core.ServiceJwtToken;
using Microsoft.EntityFrameworkCore;
using XUtilities.NetCore6.Seguranca;

namespace Holerite.Core.Services.Controler
{
    public class ControlerService : IControlerService
    {
        private readonly IMapper _mapper;
        private readonly IControleAcessosRepository _controleAcessosRepository;
        private readonly ILoginRepository _loginRepository;
        private readonly IFuncionalidadesRepository _funcionalidadesRepository;
        private readonly IPerfilRepository _perfilRepository;

        public ControlerService(
            IControleAcessosRepository controleAcessosRepository,
            ILoginRepository loginRepository,
            IFuncionalidadesRepository funcionalidadesRepository,
            IPerfilRepository perfilRepository,
            IMapper mapper)
        {
            _mapper = mapper;
            _controleAcessosRepository = controleAcessosRepository;
            _loginRepository = loginRepository ;
            _funcionalidadesRepository = funcionalidadesRepository;
            _perfilRepository = perfilRepository;
        }

        public async Task<LoginAuthDto> LoginAuth(string? pCpf, string? pPassword)
        {
            var loginAuth = await _loginRepository
                    .QueryableFor(p => p.LoginAuth == pCpf)
                    .Include(pX => pX.Pessoas)
                    .Include(p => p.Perfil).ThenInclude(pX => pX.ControleAcessos).ThenInclude(pX => pX.Funcionalidades)
                    .FirstOrDefaultAsync();

            if (loginAuth is null)
                throw new Exception("Login não Encontrado!!!");

            string descriptografarSenha = pPassword; //XAesCrip.Decriptografar(pLogin.Senha);
            var tee = XAesCrip.Criptografar(pPassword);
            string confimaSenha = XAesCrip.Decriptografar(loginAuth.Senha);

            if (descriptografarSenha != confimaSenha) throw new Exception("Senha ou Usuário não valido!!");

            LoginAuthDto loginAuthDto = _mapper.Map<LoginAuthDto>(loginAuth);

            loginAuthDto.Jwt = loginAuth.Jwt = TokenServices.GenerateToken(loginAuthDto);
            _loginRepository.Update(loginAuth);
            await _loginRepository.UnitOfWork.Commit();
            //if (!TokenServices.ValidateToken(loginAuthDto.Jwt))
            //{
            //}
            

            var controle = loginAuth.Perfil.ControleAcessos.ToList();
            List<FuncionalidadesResponseDto> funcionalidade = new List<FuncionalidadesResponseDto>();
            controle.ForEach(item =>
            {
                funcionalidade.Add(_mapper.Map<FuncionalidadesResponseDto>(item.Funcionalidades));
            });

            loginAuthDto.Funcionalidades = funcionalidade;

            return loginAuthDto;
        }
    }
}
