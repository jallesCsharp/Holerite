using AutoMapper;
using Holerite.Application.Commands.Controler.Requests;
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
        private readonly IEmailSMTPService _emailSMTPService;

        public ControlerCommandHandler(IMapper mapper,
            IEmailSMTPService emailSMTPService)
        {
            _mapper = mapper;
            _emailSMTPService = emailSMTPService;
        }

        public async Task<ValidationResultBag> Handle(CreateLoginAuthRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                return ValidationResult;
            }

            var emailSettings = _mapper.Map<EmailSettingsDto>(request);

            var resultEmailSettings = await _emailSMTPService.Create(emailSettings);

            ValidationResult.Data = _mapper.Map<EmailSettingsResponse>(resultEmailSettings);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(LoginAuthRequest request, CancellationToken cancellationToken)
        {
            EmailSettingsDto emailSettings = _mapper.Map<EmailSettingsDto>(request);

            var result = await _emailSMTPService.Update(emailSettings);

            ValidationResult.Data = _mapper.Map<EmailSettingsResponse>(result);

            return ValidationResult;
        }
    }
}
