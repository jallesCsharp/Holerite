using AutoMapper;
using Holerite.Application.Commands.Controler.Requests;
using Holerite.Application.Commands.Controler.Responses;
using Holerite.Application.Commands.Holerite.Responses.PessoasResponses;
using Holerite.Core.Interfaces.Repositories.Holerite;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ApiHolerite.Controllers.Controler
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LoginController : CustomController
    {
        public readonly IPessoasRepository _repository;

        public LoginController(IMediator mediator, IPessoasRepository repository, IMapper mapper) : base(mediator, mapper)
        {
            _repository = repository;
        }

        [HttpPost("LoginAuth")]
        [EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(PessoasResponse), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> LoginAuth([FromQuery] LoginAuthRequest request)
        {
            try
            {
                if (request is null)
                    return BadRequest("Usuário inválido");

                var resulte = await _mediator.Send(request);
                return CustomResponse(resulte);
            }
            catch (Exception)
            {
                return CustomResponse(StatusCodes.Status400BadRequest);
            }
        }

        //[HttpPost("LoginAuth")]
        //[EnableCors("AlowsCors")]
        //[ProducesResponseType(typeof(PessoasDto), StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<ActionResult<PessoasDto>> LoginAuth([FromQuery] string user, string pass)
        //{
        //    try
        //    {
        //        var pessoas = _mapper.Map<PessoasDto>(await _repository.ObterLogin(user,pass));

        //        if (pessoas is null)
        //            return BadRequest("Login inválido");

        //        pessoas.access_token = TokenServices.GenerateToken(pessoas);
        //        pessoas.TimeLog = DateTime.UtcNow;
        //        pessoas.Senha = "";

        //        return Ok(pessoas);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [HttpPost("LoginCreate")]
        [EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(LoginAutResponse), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> LoginCreate([FromQuery] CreateLoginAuthRequest request)
        {
            try
            {
                if (request is null)
                    return BadRequest("Usuário inválido");

                var resulte = await _mediator.Send(request);
                return CustomResponse(resulte);
            }
            catch (Exception)
            {
                return CustomResponse(StatusCodes.Status400BadRequest);
            }
        }

        [HttpGet("ValidarToken")]
        [EnableCors("AlowsCors")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<bool>> ValidarToken(string access_token)
        {
            try
            {
                if (access_token.Equals("null"))
                    return BadRequest("Token inválido ou Nulo.");
                //bool userValidate = TokenServices.ValidateToken(access_token);
                return Ok("userValidate");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
