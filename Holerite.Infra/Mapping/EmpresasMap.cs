using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Holerite.Infra.Mapping
{
    public class EmpresasMap : IEntityTypeConfiguration<Empresas>
    {
        public void Configure(EntityTypeBuilder<Empresas> builder)
        {

            builder.ToTable("Empresas");
            builder.HasKey(m => m.Id);

        }
    }
}
