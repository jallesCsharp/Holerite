using Holerite.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Interfaces.Services.Controler
{
    public interface IFuncionalidadesService
    {
        Task<IEnumerable<FuncionalidadesDto?>> GetPerfil(string nomePerfil);
    }
}
