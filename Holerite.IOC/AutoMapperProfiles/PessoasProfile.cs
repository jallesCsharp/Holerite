using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.PessoasRequest;
using Holerite.Application.Commands.Holerite.Responses.PessoasResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class PessoasProfile : Profile
    {
        public PessoasProfile()
        {
            CreateMap<Pessoas, PessoasDto>().ReverseMap();
            CreateMap<PessoasDto, PessoasResponse>().ReverseMap();

            CreateMap<PessoasDto, CreatePessoasRequest>().ReverseMap();
            CreateMap<PessoasDto, UpdatePessoasRequest>().ReverseMap();
            CreateMap<PessoasDto, DeletePessoasRequest>().ReverseMap();
            CreateMap<PessoasDto, PatchPessoasRequest>().ReverseMap();
        }
    }
}
