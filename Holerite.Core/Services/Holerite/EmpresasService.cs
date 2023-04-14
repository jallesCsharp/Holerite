using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Holerite;
using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public class EmpresasService : IEmpresasService
    {
        private readonly IMapper _mapper;
        private readonly IEmpresasRepository _repository;

        public EmpresasService(IEmpresasRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<IEnumerable<EmpresasDto?>> GetAll()
        {
            var empresas = await _repository
                .QueryableFor()
                .ToListAsync();
            return _mapper.Map<IEnumerable<EmpresasDto>>(empresas);
        }

        public async Task<EmpresasDto?> GetById(Guid id)
        {
            var empresa = await _repository
                .QueryableFor(p => p.Id == id)
                .FirstOrDefaultAsync();
            return _mapper.Map<EmpresasDto>(empresa);
        }

        public async Task<EmpresasDto> Create(EmpresasDto empresaDto)
        {
            var empresa = _mapper.Map<Empresas>(empresaDto);
            var resultEmpresa = _repository.Add(empresa);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<EmpresasDto>(resultEmpresa);
        }

        public async Task<EmpresasDto> Update(EmpresasDto empresaDto)
        {
            var empresa = _mapper.Map<Empresas>(empresaDto);
            var resultEmpresa = _repository.Update(empresa);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<EmpresasDto>(resultEmpresa);
        }

        public async Task<EmpresasDto?> Delete(EmpresasDto empresaDto)
        {
            var empresa = _mapper.Map<Empresas>(empresaDto);
            var resultEmpresa = _repository?.Remove(empresa);
            return await Task.FromResult(_mapper.Map<EmpresasDto>(resultEmpresa));
        }
    }
}
