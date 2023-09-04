using AutoMapper;
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
        }
    }
}
