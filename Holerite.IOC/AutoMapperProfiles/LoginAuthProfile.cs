using AutoMapper;
using Holerite.Application.Commands.Controler.Responses;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class LoginAuthProfile : Profile
    {
        public LoginAuthProfile()
        {
            CreateMap<Login, LoginAuthDto>().ReverseMap();
            CreateMap<LoginAuthDto, LoginAutResponse>()
                .ForMember(pX => pX.NomeUsuario, rX => rX.MapFrom(pX => pX.Pessoas.Nome))
                .ReverseMap();
        }
    }
}
