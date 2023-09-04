using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class ControleAcessosProfile : Profile
    {
        public ControleAcessosProfile()
        {
            CreateMap<ControleAcessos, ControleAcessosDto>().ReverseMap();
        }
    }
}
