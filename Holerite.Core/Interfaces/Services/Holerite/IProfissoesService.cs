using Holerite.Core.Dtos;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public interface IProfissoesService
    {
        Task<ProfissoesDto?> GetById(Guid id);
        Task<IEnumerable<ProfissoesDto?>> GetAll();
        Task<ProfissoesDto> Create(ProfissoesDto pProfissao);
        Task<ProfissoesDto> Update(ProfissoesDto pProfissao);
        Task<ProfissoesDto> Delete(ProfissoesDto pProfissao);
    }
}
