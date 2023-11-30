using AutoMapper;
using Holerite.Application.Commands.Controler.Requests;
using Holerite.Application.Commands.Controler.Responses;
using Holerite.Application.Commands.Email.Responses;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Core.Interfaces.Services.EmailSMTP;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Messages;
using Holerite.Core.Validation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Application.Commands.Controler.Handlers
{
    public class ControlerCommandHandler : CommandHandler,
        IRequestHandler<LoginAuthRequest, ValidationResultBag>,
        IRequestHandler<CreateLoginAuthRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IPessoasService _pessoasService;
        private readonly IControlerService _controlerService;

        public ControlerCommandHandler(IMapper mapper,
            IPessoasService pessoasService,
            IControlerService controlerService)
        {
            _mapper = mapper;
            _pessoasService = pessoasService;
            _controlerService = controlerService;
        }

        public async Task<ValidationResultBag> Handle(CreateLoginAuthRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                return ValidationResult;
            }

            var pessoasDto = _mapper.Map<PessoasDto>(request);

            var resultPessoasDto = await _pessoasService.Create(pessoasDto);
            var loginAuthDto = _mapper.Map<LoginAuthDto>(resultPessoasDto);
            var resultLoginAuthDto = await _controlerService.LoginCreate(loginAuthDto);

            ValidationResult.Data = _mapper.Map<LoginAutResponse>(resultLoginAuthDto);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(LoginAuthRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                AddError("Campos obrigatorios.");
                return ValidationResult;
            }

            var loginAuthDto = await _controlerService.LoginAuth(request.LoginAuth ?? "", request.Password);

            if (loginAuthDto is null)
            {
                AddError("Login não Encontrado!!!");
                return ValidationResult;
            }

            var loginAutResponse = _mapper.Map<LoginAutResponse>(loginAuthDto);

            ValidationResult.Data = loginAutResponse;

            return ValidationResult;
        }
    }
}
