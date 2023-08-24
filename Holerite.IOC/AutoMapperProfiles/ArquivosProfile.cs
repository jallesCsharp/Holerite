using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.ArquivosRequest;
using Holerite.Application.Commands.Holerite.Responses.ArquivosResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Extension;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class ArquivosProfile : Profile
    {
        public ArquivosProfile()
        {
            CreateMap<Arquivos, ArquivosDto>().ReverseMap();
            CreateMap<ArquivosResponse, ArquivosDto>()
               .ForMember(pX => pX.Mes, rX => rX.MapFrom(pX => pX.Mes.GetMes()))
               .ReverseMap();

            CreateMap<FileDto, UploadFileRequest>().ReverseMap();

            CreateMap<FilterArquivosHoleriteDto, FilterArquivosHoleriteRequest>().ReverseMap();
            CreateMap<FilterArquivosHoleriteDto, FilterArquivosPendentesHoleriteRequest>().ReverseMap();
        }
    }
}
