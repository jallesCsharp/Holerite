using Holerite.Core.Dtos;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public interface IPessoasService
    {
        Task<PessoasDto?> GetById(Guid id);
        Task<IEnumerable<PessoasDto?>> GetAll();
        Task<PessoasDto> Create(PessoasDto pPessoa);
        Task<PessoasDto> Update(PessoasDto pPessoa);
        Task<PessoasDto?> Delete(PessoasDto pPessoa);
    }
}
