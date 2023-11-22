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
    public class FuncionalidadesService : IFuncionalidadesService
    {
        private readonly IMapper _mapper;
        private readonly IFuncionalidadesRepository _repository;
        private readonly IControleAcessosRepository _controleAcessosRepository;

        public FuncionalidadesService(
            IFuncionalidadesRepository repository,
            IControleAcessosRepository controleAcessosRepository,
            IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
            _controleAcessosRepository = controleAcessosRepository;
        }

        public async Task<IEnumerable<FuncionalidadesDto?>> GetPerfil(string nomePerfil)
        {
            List<FuncionalidadesDto> lista = new List<FuncionalidadesDto>();
            lista = _mapper.Map<List<FuncionalidadesDto>>(
                await _repository
                .QueryableFor(pX => pX.Deleted.HasValue != true)
                .ToListAsync());
            return _mapper.Map<IEnumerable<FuncionalidadesDto>>(lista);
        }
    }
}
