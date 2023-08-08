using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.ArquivosRequest;
using Holerite.Application.Commands.Holerite.Responses.ArquivosResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class ArquivosProfile : Profile
    {
        public ArquivosProfile()
        {
            CreateMap<Arquivos, ArquivosDto>().ReverseMap();
            CreateMap<ArquivosDto, ArquivosResponse>().ReverseMap();

            CreateMap<FileDto, UploadFileRequest>().ReverseMap();
        }
    }
}
