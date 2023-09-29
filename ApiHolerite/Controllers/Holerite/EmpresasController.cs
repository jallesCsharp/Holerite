using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.EmpresasRequest;
using Holerite.Application.Commands.Holerite.Responses.EmpresasResponses;
using Holerite.Core.Validation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiHolerite.Controllers.Holerite
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmpresasController : CustomController
    {
        public EmpresasController(IMediator mediator, IMapper mapper)
            : base(mediator, mapper) { }

        [HttpGet]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(List<EmpresasResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetAll([FromQuery] FilterEmpresasRequest request)
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
        [ProducesResponseType(typeof(EmpresasResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Create([FromBody] CreateEmpresasRequest request)
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
        [ProducesResponseType(typeof(EmpresasResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateEmpresasRequest command)
        {
            var result = await _mediator.Send(command);
            return CustomResponse(result);
        }

        [HttpPatch("{id}")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(EmpresasResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Patch(Guid id, JsonPatchDocument<PatchEmpresasRequest> patchRequest)
        {
            var command = new PatchEmpresasRequest(patchRequest);

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
                var command = new DeleteEmpresasRequest(id);

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
