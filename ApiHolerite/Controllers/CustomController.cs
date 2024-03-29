﻿using MediatR;
using AutoMapper;
using System.Linq;
using Holerite.Core.Validation;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ApiHolerite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class CustomController : ControllerBase
    {
        protected readonly IMediator _mediator;
        protected readonly IMapper _mapper;
        protected ICollection<string> Errors = new List<string>();

        public CustomController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
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


    }
}
