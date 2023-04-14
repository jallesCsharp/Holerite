using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class ArquivosProfile : Profile
    {
        public ArquivosProfile()
        {
            CreateMap<Arquivos, ArquivosDto>().ReverseMap();
        }
    }
}
