using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Interfaces.Repositories.Email;
using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Core.Models;
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

        public async Task<LoginAuthDto> LoginAuth(string? pLoginAuth, string? pPassword)
        {
            var loginAuth = await _loginRepository
                    .QueryableFor(p => p.LoginAuth == pLoginAuth)
                    .Include(pX => pX.Pessoas)
                    .Include(p => p.Perfil)
                    .ThenInclude(pX => pX.ControleAcessos)
                    .ThenInclude(pX => pX.Funcionalidades)
                    .FirstOrDefaultAsync();

            if (loginAuth is null)
                throw new Exception("Login não Encontrado!!!");

            string descriptografarSenha = pPassword; //XAesCrip.Decriptografar(pLogin.Senha);
            string confimaSenha = XAesCrip.Decriptografar(loginAuth.Senha);

            if (descriptografarSenha != confimaSenha) throw new Exception("Senha ou Usuário não valido!!");

            LoginAuthDto loginAuthDto = _mapper.Map<LoginAuthDto>(loginAuth);

            loginAuthDto.Jwt = loginAuth.Jwt = TokenServices.GenerateToken(loginAuthDto);

            var controle = loginAuth.Perfil?.ControleAcessos?.Where(pX => !pX.Deleted.HasValue).ToList();
            List<FuncionalidadesResponseDto> funcionalidade = new List<FuncionalidadesResponseDto>();
            controle?.ForEach(item =>
            {
                funcionalidade.Add(_mapper.Map<FuncionalidadesResponseDto>(item.Funcionalidades));
            });
            loginAuth.Perfil = null;
            _loginRepository.Update(loginAuth);
            await _loginRepository.UnitOfWork.Commit();            

            loginAuthDto.Funcionalidades = funcionalidade;

            return loginAuthDto;
        }

        public async Task<LoginAuthDto> LoginCreate(LoginAuthDto loginAuthDto)
        {
            if (_loginRepository.QueryableFor(pX => pX.LoginAuth == loginAuthDto.LoginAuth).Any())
                return loginAuthDto;

            var login = _mapper.Map<Login>(loginAuthDto);
            var ret = _loginRepository.Add(login);
            await _loginRepository.UnitOfWork.Commit();
            return _mapper.Map<LoginAuthDto>(ret);
            
        }
    }
}
