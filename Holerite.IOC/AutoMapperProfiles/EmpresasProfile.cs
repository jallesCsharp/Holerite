using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class EmpresasProfile : Profile
    {
        public EmpresasProfile()
        {
            CreateMap<Empresas, EmpresasDto>().ReverseMap();
        }
    }
}
