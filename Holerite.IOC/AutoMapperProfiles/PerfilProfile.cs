using AutoMapper;
using Holerite.Application.Commands.Controler.Requests.PerfilRequest;
using Holerite.Application.Commands.Controler.Responses.PerfilResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class PerfilProfile : Profile
    {
        public PerfilProfile()
        {
            CreateMap<Perfil, PerfilDto>().ReverseMap();
            CreateMap<PerfilDto, PerfilResponse>().ReverseMap();

            CreateMap<PerfilDto, CreatePerfilRequest>().ReverseMap();
            CreateMap<PerfilDto, UpdatePerfilRequest>().ReverseMap();
            CreateMap<PerfilDto, DeletePerfilRequest>().ReverseMap();
            CreateMap<PerfilDto, FilterPerfilRequest>().ReverseMap();
        }
    }
}
