using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Holerite.Infra.Mapping
{
    public class FuncionalidadesMap : IEntityTypeConfiguration<Funcionalidades>
    {
        public void Configure(EntityTypeBuilder<Funcionalidades> builder)
        {

            builder.ToTable("Funcionalidades");
            builder.HasKey(m => m.Id);

        }
    }
}
