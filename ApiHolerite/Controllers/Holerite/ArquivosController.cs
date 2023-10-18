using AutoMapper;
using FluentValidation.Results;
using Holerite.Application.Commands.Holerite.Requests.ArquivosRequest;
using Holerite.Application.Commands.Holerite.Responses.ArquivosResponses;
using Holerite.Core.Validation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiHolerite.Controllers.Holerite
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ArquivosController : CustomController
    {
        public ArquivosController(ILogger<ArquivosController> logger, IMediator mediator, IMapper mapper)
            : base(logger, mediator, mapper) { }


        [HttpGet("GetArquivoHolerite")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(List<ArquivosResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetArquivoHolerite([FromQuery] FilterArquivosHoleriteRequest request)
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
                // return CustomResponse(StatusCodes.Status400BadRequest);
            }
        }
        [HttpGet("GetPesquisarArquivos")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(List<ArquivosResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> GetPesquisarArquivos([FromQuery] FilterArquivosHoleriteRequest request)
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
                // return CustomResponse(StatusCodes.Status400BadRequest);
            }
        }
        
        [HttpGet("GetPesquisarArquivosPendentes")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(List<ArquivosResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize]
        public async Task<ActionResult> GetPesquisarArquivosPendentes([FromQuery] FilterArquivosPendentesHoleriteRequest request)
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
                // return CustomResponse(StatusCodes.Status400BadRequest);
            }
        }

        [HttpPost]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(ArquivosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize]
        public async Task<ActionResult> Create([FromBody] CreateArquivosRequest request)
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

        [HttpPost("ConfirmarEnvioEmailPendentes")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(ArquivosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ConfirmarEnvioEmailPendentes([FromBody] ConfirmarEnvioEmailArquivosRequest request)
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
        
        [HttpPost("ReenviarEmail")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(ArquivosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ReenviarEmail([FromBody] ReenviarEmailRequest request)
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
        [ProducesResponseType(typeof(ArquivosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateArquivosRequest command)
        {
            var result = await _mediator.Send(command);
            return CustomResponse(result);
        }

        [HttpPatch("{id}")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(ArquivosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Patch(Guid id, JsonPatchDocument<PatchArquivosRequest> patchRequest)
        {
            var command = new PatchArquivosRequest(patchRequest);

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
                var command = new DeleteArquivosRequest(id);

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
