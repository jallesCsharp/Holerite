using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Email;
using Holerite.Core.Interfaces.Services.EmailSMTP;
using Holerite.Core.Models;
using iText.Kernel.Pdf;
using iText.StyledXmlParser.Jsoup.Nodes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Services.EmailSMTP
{
    public class EmailSMTPService : IEmailSMTPService
    {
        private readonly IMapper _mapper;
        private readonly IEmailSettingsRepository _repository;

        public EmailSMTPService(IEmailSettingsRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public Task<bool> EnvioEmail(EmailSettingsDto emailSettingsDto, string displayName, string pFrom, string pTo, string pAttachments, string pSubject, string pBody)
        {

            try
            {
                MailMessage mailSend = new MailMessage();

                mailSend.From = new MailAddress(pFrom, displayName);

                mailSend.To.Add(pTo);

                mailSend.Subject = pSubject;

                mailSend.SubjectEncoding = System.Text.Encoding.UTF8;

                mailSend.Body = pBody;

                mailSend.BodyEncoding = System.Text.Encoding.UTF8;

                mailSend.IsBodyHtml = true;

                if (!string.IsNullOrEmpty(pAttachments))
                    mailSend.Attachments.Add(new Attachment(new MemoryStream(Convert.FromBase64String(pAttachments)), $"Contracheque{mailSend.Attachments.Count() + 1}.pdf"));

                using (SmtpClient smtp = new SmtpClient(emailSettingsDto.ServidorSMTP ?? "", emailSettingsDto.Porta))
                {
                    smtp.Credentials = new NetworkCredential
                    {
                        UserName = emailSettingsDto.SenderNome,
                        Password = emailSettingsDto.Password
                    };
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.EnableSsl = emailSettingsDto.RequerSSL;
                    smtp.UseDefaultCredentials = false;

                    smtp.Send(mailSend);
                };

                return Task.FromResult(true);
            }
            catch (Exception eX)
            {
                throw new Exception(eX.Message);
            }
        }

        public async Task<EmailSettingsDto> Create(EmailSettingsDto emailSettingsDto)
        {
            EmailSettings? emailSettings = _mapper.Map<EmailSettings>(emailSettingsDto);

            EmailSettings? resultEmailSettings = _repository.Add(emailSettings);

            await _repository.UnitOfWork.Commit();
            return _mapper.Map<EmailSettingsDto>(resultEmailSettings);
        }

        public async Task<EmailSettingsDto> Update(EmailSettingsDto emailSettingsDto)
        {
            var emailSettings = _mapper.Map<EmailSettings>(emailSettingsDto);
            var ret = _repository.Update(emailSettings);
            await _repository.UnitOfWork.Commit();
            return _mapper.Map<EmailSettingsDto>(ret);
        }
    }
}
