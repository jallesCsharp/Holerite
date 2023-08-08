using AutoMapper;
using FluentValidation.Results;
using Holerite.Application.Commands.Holerite.Requests.ArquivoDocumentosRequest;
using Holerite.Application.Commands.Holerite.Responses.ArquivoDocumentosResponses;
using Holerite.Application.Commands.Holerite.Responses.ArquivosResponses;
using Holerite.Core.Validation;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ApiHolerite.Controllers.Holerite
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class ArquivoDocumentosController : CustomController
    {
        public ArquivoDocumentosController(IMediator mediator, IMapper mapper)
            : base(mediator, mapper) { }

        [HttpPost("Holerite")]
        [EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(ArquivosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize]
        public async Task<ActionResult> Create([FromForm] CreateArquivoDocumentosRequest request)
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
                bag.Errors.Add(new ValidationFailure(StatusCodes.Status400BadRequest.ToString(), $"Error Ler Arquivo PDF: {eX.Message}"));
                return CustomResponse(bag);
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ArquivosResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateArquivoDocumentosRequest command)
        {
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
                var command = new DeleteArquivoDocumentosRequest(id);

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
