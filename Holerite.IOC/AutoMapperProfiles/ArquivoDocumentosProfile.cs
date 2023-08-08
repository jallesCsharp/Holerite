using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.ArquivoDocumentosRequest;
using Holerite.Application.Commands.Holerite.Responses.ArquivoDocumentosResponses;
using Holerite.Application.Commands.Holerite.Responses.ArquivosResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Models;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class ArquivoDocumentosProfile : Profile
    {
        public ArquivoDocumentosProfile()
        {
            CreateMap<ArquivoDocumentos, ArquivoDocumentosDto>().ReverseMap();

            CreateMap<ArquivoDocumentosDto, ArquivoDocumentosResponse>().ReverseMap();
            CreateMap<ArquivosDto, ArquivosResponse>().ReverseMap();

            CreateMap<ArquivoDocumentosDto, CreateArquivoDocumentosRequest>().ReverseMap();
            CreateMap<ArquivoDocumentosDto, UpdateArquivoDocumentosRequest>().ReverseMap();
            CreateMap<ArquivoDocumentosDto, DeleteArquivoDocumentosRequest>().ReverseMap();
        }
    }
}
