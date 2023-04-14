using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;
using Holerite.Application.Commands.Holerite.Responses.ProfissoesResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class ProfissoesProfile : Profile
    {
        public ProfissoesProfile()
        {
            CreateMap<Profissoes, ProfissoesDto>().ReverseMap();
            CreateMap<PessoasDto, ProfissoesResponse>().ReverseMap();

            CreateMap<ProfissoesDto, CreateProfissoesRequest>().ReverseMap();
            CreateMap<ProfissoesDto, UpdateProfissoesRequest>().ReverseMap();
            CreateMap<ProfissoesDto, DeleteProfissoesRequest>().ReverseMap();
            CreateMap<ProfissoesDto, PatchProfissoesRequest>().ReverseMap();
        }
    }
}
