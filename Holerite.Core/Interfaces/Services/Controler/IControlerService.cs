using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Interfaces.Services.Controler
{
    public class IControlerService
    {
        Task<LoginAuthDto> LoginAuth(LoginAuthDto loginAuthDto);
        Task<EmailSettingsDto> LoginCreate(EmailSettingsDto emailSettingsDto);
    }
}
