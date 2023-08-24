using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.EmpresasRequest;
using Holerite.Application.Commands.Holerite.Responses.EmpresasResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class EmpresasProfile : Profile
    {
        public EmpresasProfile()
        {
            CreateMap<Empresas, EmpresasDto>().ReverseMap();

            CreateMap<EmpresasDto, EmpresasResponse>().ReverseMap();
            CreateMap<EmpresasDto, FilterEmpresasRequest>().ReverseMap();
            CreateMap<EmpresasDto, CreateEmpresasRequest>().ReverseMap();
        }
    }
}
