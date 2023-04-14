using Holerite.Core.Dtos;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public interface IEmpresasService
    {
        Task<EmpresasDto?> GetById(Guid id);
        Task<IEnumerable<EmpresasDto?>> GetAll();
        Task<EmpresasDto> Create(EmpresasDto pEmpresa);
        Task<EmpresasDto> Update(EmpresasDto pEmpresa);
        Task<EmpresasDto?> Delete(EmpresasDto pEmpresa);
    }
}
