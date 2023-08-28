using AutoMapper;
using Holerite.Application.Commands.Controler.Requests;
using Holerite.Application.Commands.Controler.Responses;
using Holerite.Application.Commands.Email.Responses;
using Holerite.Core.Dtos;
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

        public ControlerCommandHandler(IMapper mapper,
            IPessoasService pessoasService)
        {
            _mapper = mapper;
            _pessoasService = pessoasService;
        }

        public async Task<ValidationResultBag> Handle(CreateLoginAuthRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                ValidationResult.Errors.AddRange(request.ValidationResult.Errors);
                return ValidationResult;
            }

            var pessoasDto = _mapper.Map<PessoasDto>(request);

            var resultEmailSettings = await _pessoasService.Create(pessoasDto);

            ValidationResult.Data = _mapper.Map<LoginAutResponse>(resultEmailSettings);

            return ValidationResult;
        }

        public async Task<ValidationResultBag> Handle(LoginAuthRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                AddError("Campos obrigatorios.");
                return ValidationResult;
            }

            PessoasDto pessoa = await _pessoasService.GetLogin(request.Cpf ?? "");

            if (pessoa is null)
            {
                AddError("Login não Encontrado!!!");
                return ValidationResult;
            }


            //var pessoaDto = _mapper.Map<PessoasDto>(request);
            ////Criar regra de validação da senha
            var resultPessoas = await _pessoasService.GetLogin(pessoa);

            ValidationResult.Data = _mapper.Map<LoginAutResponse>(pessoa);

            return ValidationResult;
        }
    }
}
