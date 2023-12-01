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
    public class PerfilService : IPerfilService
    {
        private readonly IMapper _mapper;
        private readonly IPerfilRepository _repository;
        private readonly IControleAcessosRepository _controleAcessosRepository;

        public PerfilService(
            IPerfilRepository repository,
            IControleAcessosRepository controleAcessosRepository,
            IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
            _controleAcessosRepository = controleAcessosRepository;
        }

        public async Task<IEnumerable<PerfilDto?>> GetAll()
        {
            List<PerfilDto> listaPerfils = new List<PerfilDto>();
            listaPerfils = _mapper.Map<List<PerfilDto>>(
                await _repository
                .QueryableFor(pX => !pX.Deleted.HasValue)
                .ToListAsync());
            return _mapper.Map<IEnumerable<PerfilDto>>(listaPerfils);
        }

        public async Task<PerfilDto?> GetById(Guid id)
        {
            var perfil = await _repository
                .QueryableFor(p => p.Id == id)
                .Where(pX => !pX.Deleted.HasValue)
                .FirstOrDefaultAsync();
            return _mapper.Map<PerfilDto>(perfil);
        }

        public async Task<PerfilDto> CreateUpdate(PerfilDto perfilDto)
        {
            Perfil? result = new Perfil();
            var perfil = _mapper.Map<Perfil>(perfilDto);

            result = _repository.QueryableFilter().Where(pX => pX.NomePerfil == perfilDto.NomePerfil).FirstOrDefault();
            if (result is null)
                result = _repository.Add(perfil);
            else
                result = _repository.Update(perfil);

            await _repository.UnitOfWork.Commit();
            return _mapper.Map<PerfilDto>(result);
        }

        public async Task<PerfilDto> Create(PerfilDto perfilDto)
        {
            var perfil = _mapper.Map<Perfil>(perfilDto);
            var result = _repository.Add(perfil);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<PerfilDto>(result);
        }

        public async Task<PerfilDto> Update(PerfilDto perfilDto)
        {
            var perfil = _mapper.Map<Perfil>(perfilDto);
            var result = _repository.Update(perfil);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<PerfilDto>(result);
        }

        public async Task<string?> Delete(PerfilDto perfilDto)
        {
            try
            {
                var perfil = _mapper.Map<Perfil>(perfilDto);
                _repository.Remove(perfil);
                await _repository.UnitOfWork.Commit();
                return await Task.FromResult($"Exclusão do perfil '{perfilDto.NomePerfil}' realizado com sucesso!");
            }
            catch (Exception eX)
            {
                throw new Exception(eX.Message);
            }
        }

        public async Task<PerfilDto> GetPerfil(string pNomePerfil)
        {
            var perfil = await _repository
                .QueryableFor(p => p.NomePerfil == pNomePerfil)
                .Where(pX => !pX.Deleted.HasValue)
                .FirstOrDefaultAsync();
            return _mapper.Map<PerfilDto>(perfil);
        }
    }
}
