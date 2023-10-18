
using Holerite.Core.Dtos;

namespace Holerite.Application.Commands.Controler.Responses.ControleAcessosResponses
{
    public class ControleAcessosResponse
    {
        public Guid Id { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public DateTime? Deleted { get; set; }

        public Guid? PerfilId { get; set; }
        public Guid? FuncionalidadesId { get; set; }
        public bool Ativar { get; set; }

        public virtual FuncionalidadesDto? Funcionalidades { get; set; }
        public virtual PerfilDto? Perfil { get; set; }
    }
}
