﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Interfaces.Services.EmailSMTP
{
    public interface IEmailSMTPService
    {
        Task<Object> EnvioEmail();
    }
}