using System;
using MediatR;
using AutoMapper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Holerite.Application.Commands.Controler.Requests.FuncionalidadesRequest;
using Holerite.Application.Commands.Controler.Responses.FuncionalidadesResponses;
using Holerite.Core.Validation;
using FluentValidation.Results;

namespace ApiHolerite.Controllers.Controler
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionalidadesController : CustomController
    {

        public FuncionalidadesController(
            ILogger<PerfilController> logger,
            IMediator mediator,
            IMapper mapper) : base(logger, mediator, mapper)
        { }

        [HttpGet]
        [EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(List<FuncionalidadesResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAll([FromQuery] FilterFuncionalidadesRequest request)
        {
            try
            {
                if (request is null)
                    return CustomResponse("Objeto inválido");
                var resulte = await _mediator.Send(request);
                return CustomResponse(resulte);
            }
            catch (Exception eX)
            {
                var bag = new ValidationResultBag();
                bag.Errors.Add(new ValidationFailure(StatusCodes.Status400BadRequest.ToString(), $"{eX.Message}"));
                return CustomResponse(bag);
            }
        }
    }
}
