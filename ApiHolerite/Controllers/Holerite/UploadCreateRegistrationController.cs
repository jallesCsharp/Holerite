using AutoMapper;
using Holerite.Application.Commands.Holerite.Requests.ArquivosRequest;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApiHolerite.Controllers.Holerite
{
    public class UploadCreateRegistrationController : CustomController
    {
        public UploadCreateRegistrationController(ILogger<UploadCreateRegistrationController> logger, IMediator mediator, IMapper mapper)
            : base(logger, mediator, mapper) { }

        [HttpPost("UploadCadastroGeral")]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(IActionResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Authorize]
        public async Task<ActionResult> UploadCreateRegistration([FromForm] UploadFileRequest request)
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
                return CustomResponse(new Dictionary<string, object>
                {
                    {"errors", eX.Message },
                    {"success", false }
                });
            }
        }

        [HttpGet]
        //[EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(IActionResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DownloadTemplate()
        {
            try
            {
                string[] modelo = { "CPF", "PIS", "NOME", "CÓDIGO FOLHA", "EMPRESA", "FUNÇÃO", "EMAIL", "NASCIMENTO", "ADMISSÃO", "SALÁRIO" };

                StringBuilder sb = new StringBuilder();

                for (int j = 0; j < modelo.Length; j++)
                    sb.Append(modelo[j] + ';');
                                                                
                return File(UTF8Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", "ImportarCadastro.csv");
            }
            catch (Exception)
            {
                return CustomResponse(StatusCodes.Status400BadRequest);
            }
        }
    }
}
