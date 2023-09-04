using AutoMapper;
using Holerite.Application.Commands.Email.Requests;
using Holerite.Application.Commands.Email.Responses;
using Holerite.Core.Dtos;
using Holerite.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.IOC.AutoMapperProfiles
{
    public class EmailSettingsProfile : Profile
    {
        public EmailSettingsProfile()
        {
            CreateMap<EmailSettings, EmailSettingsDto>().ReverseMap();
            CreateMap<EmailSettingsDto, CreateEmailSettingsRequest>().ReverseMap();
            CreateMap<EmailSettingsDto, EmailSettingsResponse>().ReverseMap();
            CreateMap<EmailSettingsDto, UpdateEmailSettingsRequest>().ReverseMap();

        }
    }
}
