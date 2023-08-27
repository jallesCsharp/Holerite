using AutoMapper;
using Holerite.Core.Interfaces.Services.Controler;

namespace Holerite.Core.Services.Controler
{
    public class ControlerService : IControlerService
    {
        private readonly IMapper _mapper;
        private readonly IEmailSettingsRepository _repository;

        public ControlerService(IEmailSettingsRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
    }
}
