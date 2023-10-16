using Holerite.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Interfaces.Services.Controler
{
    public interface IPerfilService
    {
        Task<IEnumerable<PerfilDto>> GetPerfilAll();
        Task<PerfilDto> GetPerfil(string perfil);
    }
}
