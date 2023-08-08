using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Holerite.Infra.Mapping
{
    public class ProfissoesMap : IEntityTypeConfiguration<Profissoes>
    {
        public void Configure(EntityTypeBuilder<Profissoes> builder)
        {

            builder.ToTable("Profissoes");
            builder.HasKey(m => m.Id);

        }
    }
}
