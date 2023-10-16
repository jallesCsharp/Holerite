using Holerite.Core.Dtos;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public interface IPessoasService
    {
        Task<IEnumerable<PessoasDto?>> GetAll();
        Task<PessoasDto?> GetById(Guid id);
        Task<PessoasDto?> GetByCodigoFolha(string pCodigoFolha);
        Task<PessoasDto> Create(PessoasDto pPessoa);
        Task<IEnumerable<PessoasDto>> CreateList(List<PessoasDto> plistPessoa);
        Task<PessoasDto> GetLogin(string pCpf);
        Task<PessoasDto> Update(PessoasDto pPessoa);
        Task<string?> Delete(PessoasDto pPessoa);
        Task<IEnumerable<PessoasDto?>> GetFilterProperty(IEnumerable<FilterDto> pProperty);
    }
}
