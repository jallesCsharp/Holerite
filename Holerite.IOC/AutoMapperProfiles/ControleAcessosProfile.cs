using AutoMapper;
using Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest;
using Holerite.Application.Commands.Controler.Responses.ControleAcessosResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class ControleAcessosProfile : Profile
    {
        public ControleAcessosProfile()
        {
            CreateMap<ControleAcessos, ControleAcessosDto>().ReverseMap();
            CreateMap<ControleAcessosDto, ControleAcessosResponse>().ReverseMap();

            CreateMap<PerfilDto, CreateControleAcessosRequest>().ReverseMap();
            CreateMap<PerfilDto, UpdateControleAcessosRequest>().ReverseMap();
            CreateMap<PerfilDto, DeleteControleAcessosRequest>().ReverseMap();
            CreateMap<PerfilDto, PatchControleAcessosRequest>().ReverseMap();
            CreateMap<PerfilDto, FilterControleAcessosRequest>().ReverseMap();
        }
    }
}
