using AutoMapper;
using Holerite.Core.Dtos;
using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Interfaces.Services.Controler;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Core.Services.Controler
{
    public class PerfilService : IPerfilService
    {
        private readonly IMapper _mapper;
        private readonly IPerfilRepository _repository;

        public PerfilService(
            IPerfilRepository repository,
            IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<PerfilDto> GetPerfil(string pPerfil)
        {
            var perfil = await _repository
               .QueryableFor(p => p.NomePerfil == pPerfil)
               .FirstOrDefaultAsync();
            return _mapper.Map<PerfilDto>(perfil);
        }

        public async Task<IEnumerable<PerfilDto>> GetPerfilAll()
        {
            var perfil = await _repository
                .QueryableFor()
                .ToListAsync();
            return _mapper.Map<IEnumerable<PerfilDto>>(perfil);
        }
    }
}
