using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class FuncionalidadesProfile : Profile
    {
        public FuncionalidadesProfile()
        {
            CreateMap<Funcionalidades, FuncionalidadesDto>().ReverseMap();
            CreateMap< Funcionalidades, FuncionalidadesResponseDto>().ReverseMap();
        }
    }
}
