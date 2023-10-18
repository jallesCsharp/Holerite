﻿using Holerite.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Interfaces.Services.Controler
{
    public interface IControleAcessosService
    {
        Task<ControleAcessosDto?> GetById(Guid id);
        Task<IEnumerable<ControleAcessosDto?>> GetAll();
        Task<ControleAcessosDto> Create(ControleAcessosDto pControleAcessos);
        Task<ControleAcessosDto> Update(ControleAcessosDto pControleAcessos);
        Task<string?> Delete(ControleAcessosDto pControleAcessos);
    }
}
