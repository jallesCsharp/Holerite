using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Holerite.Infra.Mapping
{
    public class ArquivosMap : IEntityTypeConfiguration<Arquivos>
    {
        public void Configure(EntityTypeBuilder<Arquivos> builder)
        {

            builder.ToTable("Arquivos");
            builder.HasKey(m => m.Id);

        }
    }
}
