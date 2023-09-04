using AutoMapper;
using Holerite.Application.Commands.Email.Requests;
using Holerite.Application.Commands.Email.Responses;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Services.EmailSMTP;
using Holerite.Core.Messages;
using Holerite.Core.Validation;
using MediatR;

namespace Holerite.Application.Commands.Email.Handlers
{
    public class EmailSettingsCommandHandler : CommandHandler,
        IRequestHandler<CreateEmailSettingsRequest, ValidationResultBag>,
        IRequestHandler<UpdateEmailSettingsRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IEmailSMTPService _emailSMTPService;

        public EmailSettingsCommandHandler(IMapper mapper,
            IEmailSMTPService emailSMTPService)
        {
            _mapper = mapper;
            _emailSMTPService = emailSMTPService;
        }

        public async Task<ValidationResultBag> Handle(CreateEmailSettingsRequest request, CancellationToken cancellationToken)
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

        public async Task<ValidationResultBag> Handle(UpdateEmailSettingsRequest request, CancellationToken cancellationToken)
        {
            EmailSettingsDto emailSettings = _mapper.Map<EmailSettingsDto>(request);

            var result = await _emailSMTPService.Update(emailSettings);

            ValidationResult.Data = _mapper.Map<EmailSettingsResponse>(result);

            return ValidationResult;
        }
    }
}
