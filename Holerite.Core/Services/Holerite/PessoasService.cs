using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Holerite.Core.Services.Holerite
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
                .Include(pX => pX.Empresas)
                .Include(pX => pX.Profissoes)
                .ToListAsync();
            return _mapper.Map<IEnumerable<PessoasDto>>(pessoa);
        }

        public async Task<IEnumerable<PessoasDto?>> GetFilterProperty(IEnumerable<FilterDto> pProperty)
        {
            var pessoa = await _repository.QueryableFor()
                .Where(p => EF.Property<string>(p, pProperty.ToArray()[0].Property) == pProperty.ToArray()[0].PropertyValue
                && EF.Property<string>(p, pProperty.ToArray()[1].Property) == pProperty.ToArray()[1].PropertyValue
                && EF.Property<string>(p, pProperty.ToArray()[2].Property) == pProperty.ToArray()[2].PropertyValue).ToListAsync();

            return _mapper.Map<IEnumerable<PessoasDto?>>(pessoa);
        }

        public async Task<PessoasDto?> GetByCodigoFolha(string pCodigoFolha)
        {
            var pessoa = await _repository
                .QueryableFor(p => p.CodigoFolha == Convert.ToInt64(pCodigoFolha))
                .FirstOrDefaultAsync();
            return _mapper.Map<PessoasDto>(pessoa);
        }

        public async Task<PessoasDto?> GetById(Guid id)
        {
            var pessoa = await _repository
                .QueryableFor(p => p.Id == id)
                .FirstOrDefaultAsync();
            return _mapper.Map<PessoasDto>(pessoa);
        }

        public async Task<PessoasDto> GetLogin(string pCpf)
        {
            var pessoa = await _repository
                .QueryableFor(p => p.Cpf == pCpf)
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
        
        public async Task<IEnumerable<PessoasDto>> CreateList(List<PessoasDto> listPessoasDto)
        {
            var listPessoas = _mapper.Map<List<Pessoas>>(listPessoasDto);
            var ret = _repository.AddRange(listPessoas);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<IEnumerable<PessoasDto>>(ret);
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
