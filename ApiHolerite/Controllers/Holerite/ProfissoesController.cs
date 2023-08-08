﻿using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.EmpresasRequest;
using Holerite.Application.Commands.Holerite.Requests.ProfissoesRequest;
using Holerite.Application.Commands.Holerite.Responses.ProfissoesResponses;
using Holerite.Core.Validation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ApiHolerite.Controllers.Holerite
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfissoesController : CustomController
    {
        public ProfissoesController(IMediator mediator, IMapper mapper)
            : base(mediator, mapper) { }

        [HttpPost]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(ProfissoesResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize]
        public async Task<ActionResult> Create([FromBody] CreateProfissoesRequest request)
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
        [ProducesResponseType(typeof(ProfissoesResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateProfissoesRequest command)
        {
            var result = await _mediator.Send(command);
            return CustomResponse(result);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(typeof(ProfissoesResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Patch(Guid id, JsonPatchDocument<PatchProfissoesRequest> patchRequest)
        {
            var command = new PatchProfissoesRequest(patchRequest);

            var result = await _mediator.Send(command);

            return CustomResponse(result);
        }

        [HttpDelete("{id:Guid}")]
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
