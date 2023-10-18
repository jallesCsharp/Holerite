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
        Task<PerfilDto> GetPerfil(string pPerfil);
        Task<PerfilDto?> GetById(Guid id);
        Task<IEnumerable<PerfilDto?>> GetAll();
        Task<PerfilDto> CreateUpdate(PerfilDto pPerfil);
        Task<PerfilDto> Create(PerfilDto pPerfil);
        Task<PerfilDto> Update(PerfilDto pPerfil);
        Task<string?> Delete(PerfilDto pPerfil);
    }
}
