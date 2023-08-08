using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.LoginRequest;
using Holerite.Application.Commands.Holerite.Responses.PessoasResponses;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Services.Holerite;
using Holerite.Core.Messages;
using MediatR;
using Holerite.Core.Validation;

namespace Holerite.Application.Commands.Holerite.Handlers
{
    public class LoginAuthCommandHandler : CommandHandler,
        IRequestHandler<LoginAuthRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IPessoasService _pessoasService;

        public LoginAuthCommandHandler(IMapper mapper,
            IPessoasService pessoasService)
        {
            _mapper = mapper;
            _pessoasService = pessoasService;
        }

        public async Task<ValidationResultBag> Handle(LoginAuthRequest request, CancellationToken cancellationToken)
        {
            if (!request.IsValid())
            {
                AddError("Campos obrigatorios.");
                return ValidationResult;
            }

            PessoasDto pessoa = await _pessoasService.GetLogin(request.Cpf);

            if (pessoa is null)
            {
                AddError("Verificar Login não Localizado.");
                return ValidationResult;
            }


            var pessoaDto = _mapper.Map<PessoasDto>(request);
            //Criar regra de validação da senha
            //var resultPessoas = await _pessoasService(pessoaDto);

            ValidationResult.Data = _mapper.Map<PessoasResponse>(pessoa);

            return ValidationResult;
        }
    }
}
