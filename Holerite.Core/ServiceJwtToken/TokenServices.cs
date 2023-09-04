using Holerite.Core.Config;
using Holerite.Core.Dtos;
using Holerite.Core.Extension;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.ServiceJwtToken
{
    public static class TokenServices
    {
        public static string GenerateToken(LoginAuthDto user)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(Token.Secret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                   new Claim(ClaimTypes.Hash, user.Id.AsString()),
                   new Claim(ClaimTypes.Name, user.Pessoas.Nome.AsString()),
                   new Claim(ClaimTypes.NameIdentifier, user.Id.AsString()),
                   new Claim(ClaimTypes.Role, user.Perfil.NomePerfil.AsString()),
                }),
                Expires = DateTime.UtcNow.AddHours(48),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static bool ValidateToken(string accessToken)
        {
            try
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                byte[] key = Encoding.ASCII.GetBytes(Token.Secret);

                TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireExpirationTime = false
                };
                SecurityToken securityToken;

                List<Claim> timeExpirar = tokenHandler.ReadJwtToken(accessToken).Claims.ToList();

                DateTime expired = new DateTime(DateTime.UnixEpoch.AddSeconds(timeExpirar[4].Value.AsDouble()).Ticks);

                ClaimsPrincipal principle = tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out securityToken);
                JwtSecurityToken jwtSecurityToken = securityToken as JwtSecurityToken;

                if (jwtSecurityToken != null && jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    return true;
            }
            catch (Exception eX)
            {
                throw new Exception(eX.Message);
            }

            return false;

        }
    }
}
