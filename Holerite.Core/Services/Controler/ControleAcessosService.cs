using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Services.Controler
{
    public class ControleAcessosService : IControleAcessosService
    {
        private readonly IMapper _mapper;
        private readonly IControleAcessosRepository _repository;

        public ControleAcessosService(
            IControleAcessosRepository repository,
            IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IEnumerable<ControleAcessosDto?>> GetAll()
        {
            var perfil = await _repository
                .QueryableFor()
                .ToListAsync();
            return _mapper.Map<IEnumerable<ControleAcessosDto>>(perfil);
        }

        public async Task<ControleAcessosDto?> GetById(Guid id)
        {
            var controleAcessos = await _repository
                .QueryableFor(p => p.Id == id)
                .FirstOrDefaultAsync();
            return _mapper.Map<ControleAcessosDto>(controleAcessos);
        }

        public async Task<ControleAcessosDto> Create(ControleAcessosDto controleAcessosDto)
        {
            var controleAcessos = _mapper.Map<ControleAcessos>(controleAcessosDto);
            var result = _repository.Add(controleAcessos);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<ControleAcessosDto>(result);
        }

        public async Task<ControleAcessosDto> Update(ControleAcessosDto controleAcessosDto)
        {
            var controleAcessos = _mapper.Map<ControleAcessos>(controleAcessosDto);
            var result = _repository.Update(controleAcessos);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<ControleAcessosDto>(result);
        }

        public async Task<string?> Delete(ControleAcessosDto controleAcessosDto)
        {
            try
            {
                var controleAcessos = _mapper.Map<ControleAcessos>(controleAcessosDto);
                _repository.Remove(controleAcessos);
                await _repository.UnitOfWork.Commit();
                return await Task.FromResult($"Exclusão realizado com sucesso!");
            }
            catch (Exception eX)
            {
                throw new Exception(eX.Message);
            }
        }
    }
}
