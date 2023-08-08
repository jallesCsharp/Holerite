
using Holerite.Core.Dtos;
using Microsoft.AspNetCore.Http;

namespace Holerite.Core.Interfaces.Services.Holerite
{
    public interface IUploadCreateRegistrationService
    {
        Task<IEnumerable<PessoasDto>> Create(FileDto pFormFile);        
    }
}
