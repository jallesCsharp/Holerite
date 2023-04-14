using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.PessoasRequest;
using Holerite.Application.Commands.Holerite.Responses.PessoasResponses;
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
    public class PessoasController : CustomController
    {
        public PessoasController(IMediator mediator, IMapper mapper)
            : base(mediator, mapper) { }

        [HttpPost]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(PessoasResponse), StatusCodes.Status200OK)]
        //[ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize]
        public async Task<ActionResult> Create([FromBody] CreatePessoasRequest request)
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
        [ProducesResponseType(typeof(PessoasResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdatePessoasRequest command)
        {
            var result = await _mediator.Send(command);
            return CustomResponse(result);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(typeof(PessoasResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Patch(Guid id, JsonPatchDocument<PatchPessoasRequest> patchRequest)
        {
            var command = new PatchPessoasRequest(patchRequest);

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
                var command = new DeletePessoasRequest(id);

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
