using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Infra.Repositories.Controler
{
    public class LoginRepository : BaseRepository<Login>, ILoginRepository
    {
        public LoginRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }

        public Task<LoginAuthDto> UpdateLogin(LoginAuthDto pLogin)
        {
            var login = _mapper.Map<Login>(pLogin);

            Context.Update(login);
            return Task.FromResult(pLogin);
        }
    }
}
