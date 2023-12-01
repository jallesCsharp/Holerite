using System;
using MediatR;
using AutoMapper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Holerite.Core.Validation;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.JsonPatch;
using Holerite.Application.Commands.Controler.Responses.ControleAcessosResponses;
using Holerite.Application.Commands.Controler.Requests.ControleAcessosRequest;

namespace ApiHolerite.Controllers.Controler
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControleAcessosController : CustomController
    {
        public ControleAcessosController(
            ILogger<ControleAcessosController> logger,
            IMediator mediator,
            IMapper mapper) : base(logger, mediator, mapper)
        {
        }

        [HttpGet]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(List<ControleAcessosResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAll([FromQuery] FilterControleAcessosRequest request)
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
        [ProducesResponseType(typeof(ControleAcessosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Create([FromBody] CreateControleAcessosRequest request)
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

        [HttpPost("PerfilControleAcesso")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(ControleAcessosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateControleAcessos([FromBody] CreatePerfilControleAcessoRequest request)
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
        [ProducesResponseType(typeof(ControleAcessosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateControleAcessosRequest command)
        {
            var result = await _mediator.Send(command);
            return CustomResponse(result);
        }

        [HttpPatch("{id}")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(ControleAcessosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Patch(Guid id, JsonPatchDocument<PatchControleAcessosRequest> patchRequest)
        {
            var command = new PatchControleAcessosRequest(patchRequest);

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
                var command = new DeleteControleAcessosRequest(id);

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
