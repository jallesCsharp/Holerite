using Holerite.Core.Dtos;
using Holerite.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Interfaces.Repositories.Controler
{
    public interface ILoginRepository : IBaseRepository<Login>
    {
        Task<LoginAuthDto> UpdateLogin(LoginAuthDto pLogin);
    }
}
