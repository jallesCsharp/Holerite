using AutoMapper;
using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Infra.Repositories.Controler
{
    public class ControleAcessosRepository : BaseRepository<ControleAcessos>, IControleAcessosRepository
    {
        public ControleAcessosRepository(HoleriteContext context, IMapper mapper)
            : base(context, mapper)
        { }
    }
}
