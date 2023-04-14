using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public class PessoasService : IPessoasService
    {
        private readonly IMapper _mapper;
        private readonly IPessoasRepository _repository;

        public PessoasService(IPessoasRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PessoasDto?>> GetAll()
        {
            var pessoa = await _repository
                .QueryableFor()
                .ToListAsync();
            return _mapper.Map<IEnumerable<PessoasDto>>(pessoa);
        }

        public async Task<PessoasDto?> GetById(Guid id)
        {
            var pessoa = await _repository
                .QueryableFor(p => p.Id == id)
                .FirstOrDefaultAsync();
            return _mapper.Map<PessoasDto>(pessoa);
        }

        public async Task<PessoasDto> Create(PessoasDto pessoaDto)
        {
            var pessoa = _mapper.Map<Pessoas>(pessoaDto);
            var ret = _repository.Add(pessoa);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<PessoasDto>(ret);
        }

        public async Task<PessoasDto> Update(PessoasDto pessoaDto)
        {
            var pessoa = _mapper.Map<Pessoas>(pessoaDto);
            var ret = _repository.Update(pessoa);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<PessoasDto>(ret);
        }

        public async Task<PessoasDto?> Delete(PessoasDto pessoaDto)
        {
            var pessoa = _mapper.Map<Pessoas>(pessoaDto);
            var ret = _mapper.Map<PessoasDto>(_repository?.Remove(pessoa));
            return await Task.FromResult(ret);
        }
    }
}
