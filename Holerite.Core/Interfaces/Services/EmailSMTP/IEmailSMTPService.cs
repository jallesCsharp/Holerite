using Holerite.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Interfaces.Services.EmailSMTP
{
    public interface IEmailSMTPService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="emailSettingsDto">Configuracoes do servico</param>
        /// <param name="pFrom">origem do e-mail</param>
        /// <param name="pTo">destino do e-mail</param>
        /// <param name="pAttachments">Anexar arquivos</param>
        /// <param name="pSubject">Assunto</param>
        /// <param name="pBody">Corpo do e-mail</param>
        /// <returns></returns>
        Task<bool> EnvioEmail(EmailSettingsDto emailSettingsDto, string displayName, string? pFrom, string? pTo, string? pAttachments, string pSubject, string pBody);
        Task<EmailSettingsDto> Update(EmailSettingsDto emailSettingsDto);
        Task<EmailSettingsDto> Create(EmailSettingsDto emailSettingsDto);
    }
}
