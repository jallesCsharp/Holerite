using MediatR;
using AutoMapper;
using System.Linq;
using Holerite.Core.Validation;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System;

namespace ApiHolerite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class CustomController : ControllerBase
    {
        private readonly ILogger<CustomController> _logger;
        protected readonly IMediator _mediator;
        protected readonly IMapper _mapper;
        protected ICollection<string> Errors = new List<string>();

        public CustomController(
            ILogger<CustomController> logger, 
            IMediator mediator, 
            IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
            _logger = logger;
        }

        protected ActionResult CustomResponse(object result = null)
        {
            if (OperacaoValida())
                return Ok(result);
            return BadRequest(new ValidationProblemDetails(new Dictionary<string, string[]>
            {
                {"Messagens", Errors.ToArray() }
            }));
        }

        protected ActionResult CustomResponse(ValidationResultBag validationResultBag)
        {
            if (validationResultBag.Errors.Count > 0)
            {
                var erros = validationResultBag.Errors.Select(x => x.ErrorMessage).ToList();
                foreach (var erro in erros)
                    AdicionarErrosProcessado(erro);
            }
            return CustomResponse(validationResultBag.Data);
        }

        private void AdicionarErrosProcessado(string erro)
        {
            Errors.Add(erro);
        }

        protected bool OperacaoValida()
        {
            return !Errors.Any();
        }

        protected void LoggerError(Exception logger, string mensagem)
        {
            _logger.LogError(logger, mensagem);
        }

        protected void LoggerInformation(string mensagem, object[] objects = null)
        {
            _logger.LogInformation(mensagem, objects);
        }
    }
}
