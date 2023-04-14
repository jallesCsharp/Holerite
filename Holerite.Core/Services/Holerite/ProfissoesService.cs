using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public class ProfissoesService : IProfissoesService
    {
        private readonly IMapper _mapper;
        private readonly IProfissoesRepository _repository;

        public ProfissoesService(IProfissoesRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProfissoesDto?>> GetAll()
        {
            var profissao = await _repository
                .QueryableFor()
                .ToListAsync();
            return _mapper.Map<IEnumerable<ProfissoesDto>>(profissao);
        }

        public async Task<ProfissoesDto?> GetById(Guid id)
        {
            var profissao = await _repository
                .QueryableFor(p => p.Id == id)
                .FirstOrDefaultAsync();
            return _mapper.Map<ProfissoesDto>(profissao);
        }

        public async Task<ProfissoesDto> Create(ProfissoesDto profissaoDto)
        {
            var profissao = _mapper.Map<Profissoes>(profissaoDto);
            var ret = _repository.Add(profissao);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<ProfissoesDto>(ret);
        }

        public async Task<ProfissoesDto> Update(ProfissoesDto profissaoDto)
        {
            var profissao = _mapper.Map<Profissoes>(profissaoDto);
            var ret = _repository.Update(profissao);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<ProfissoesDto>(ret);
        }

        public async Task<ProfissoesDto> Delete(ProfissoesDto profissaoDto)
        {
            var profissao = _mapper.Map<Profissoes>(profissaoDto);
            return await Task.FromResult(_mapper.Map<ProfissoesDto>(_repository?.Remove(profissao)));
        }
    }
}
