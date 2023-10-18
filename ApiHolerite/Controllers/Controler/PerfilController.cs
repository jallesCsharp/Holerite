using AutoMapper;
using Holerite.Application.Commands.Controler.Requests.PerfilRequest;
using Holerite.Application.Commands.Controler.Responses.PerfilResponses;
using Holerite.Core.Validation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiHolerite.Controllers.Controler
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilController : CustomController
    {

        public PerfilController(
            ILogger<PerfilController> logger,
            IMediator mediator,
            IMapper mapper) : base(logger, mediator, mapper) 
        { }

        [HttpGet]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(List<PerfilResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAll([FromQuery] FilterPerfilRequest request)
        {
            try
            {
                if (request is null)
                    return CustomResponse("Objeto inválido");
                var resulte = await _mediator.Send(request);
                return CustomResponse(resulte);
            }
            catch (Exception)
            {
                return CustomResponse(StatusCodes.Status400BadRequest);
            }
        }

        [HttpPost]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(PerfilResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Create([FromBody] CreatePerfilRequest request)
        {
            try
            {
                if (request is null)
                    return CustomResponse("Objeto inválido");
                var resulte = await _mediator.Send(request);
                return CustomResponse(resulte);
            }
            catch (Exception)
            {
                return CustomResponse(StatusCodes.Status400BadRequest);
            }
        }

        [HttpPut]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(PerfilResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdatePerfilRequest command)
        {
            var result = await _mediator.Send(command);
            return CustomResponse(result);
        }

        [HttpDelete("{id:Guid}")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(ValidationResultBag), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationResultBag), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var command = new DeletePerfilRequest(id);

                var result = await _mediator.Send(command);

                return CustomResponse(result);
            }
            catch (Exception)
            {
                return CustomResponse(StatusCodes.Status400BadRequest);
            }
        }
    }
}
