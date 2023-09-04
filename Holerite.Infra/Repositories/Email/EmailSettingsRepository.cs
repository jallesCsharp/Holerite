using AutoMapper;
using Holerite.Core.Interfaces.Repositories.Email;
using Holerite.Core.Models;

namespace Holerite.Infra.Repositories.Email
{
    public class EmailSettingsRepository : BaseRepository<EmailSettings>, IEmailSettingsRepository
    {
        public EmailSettingsRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }
    }
}
