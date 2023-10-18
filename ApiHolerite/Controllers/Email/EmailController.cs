using AutoMapper;
using Holerite.Application.Commands.Email.Requests;
using Holerite.Application.Commands.Email.Responses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ApiHolerite.Controllers.Email
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmailController : CustomController
    {
        public EmailController(ILogger<EmailController> logger, IMediator mediator, IMapper mapper)
            : base(logger, mediator, mapper) { }

        [HttpPost]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(EmailSettingsResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]        
        public async Task<ActionResult> Create([FromBody] CreateEmailSettingsRequest request)
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
        [ProducesResponseType(typeof(EmailSettingsResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] UpdateEmailSettingsRequest command)
        {
            var result = await _mediator.Send(command);
            return CustomResponse(result);
        }
    }
}
