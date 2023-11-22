using MediatR;
using AutoMapper;
using Holerite.Core.Messages;
using Holerite.Core.Validation;
using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Application.Commands.Controler.Requests.FuncionalidadesRequest;
using Holerite.Core.Dtos;
using Holerite.Application.Commands.Controler.Responses.FuncionalidadesResponses;

namespace Holerite.Application.Commands.Controler.Handlers
{
    public class FuncionalidadesCommandHandler : CommandHandler,
        IRequestHandler<FilterFuncionalidadesRequest, ValidationResultBag>
    {
        private readonly IMapper _mapper;
        private readonly IPerfilService _perfilService;
        private readonly IControleAcessosService _controleAcessosService;
        private readonly IFuncionalidadesService _funcionalidadesService;

        public FuncionalidadesCommandHandler(
            IMapper mapper,
            IPerfilService perfilService,
            IControleAcessosService controleAcessosService,
            IFuncionalidadesService funcionalidadesService)
        {
            _mapper = mapper;
            _perfilService = perfilService;
            _controleAcessosService = controleAcessosService;
            _funcionalidadesService = funcionalidadesService;
        }

        public async Task<ValidationResultBag> Handle(FilterFuncionalidadesRequest request, CancellationToken cancellationToken)
        {
            try
            {
                List<FuncionalidadesDto?> listaFuncionalidade = _mapper.Map<List<FuncionalidadesDto>>(await _funcionalidadesService.GetPerfil(request?.NomePerfil));

                if (!string.IsNullOrEmpty(request.NomePerfil))
                {
                    var listaControle = await _controleAcessosService.GetAll();
                    var iDPerfil = _perfilService.GetPerfil(request?.NomePerfil).Result.Id;
                    listaControle = listaControle.Where(pX => pX.PerfilId == iDPerfil).ToList();
                    listaFuncionalidade.ToList().ForEach(p =>
                    {
                        if (listaControle.Where(pR => pR.FuncionalidadesId == p.Id).Any())
                        {
                            listaFuncionalidade.Remove(p);
                        }
                    });
                }                
                ValidationResult.Data = _mapper.Map<IEnumerable<FuncionalidadesResponse?>>(listaFuncionalidade);                
            }
            catch (Exception e )
            {
                throw new Exception(e.Message);
            }

            return ValidationResult;
        }
    }
}
