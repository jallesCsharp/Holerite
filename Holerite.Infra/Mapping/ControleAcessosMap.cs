using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Holerite.Infra.Mapping
{
    public class ControleAcessosMap : IEntityTypeConfiguration<ControleAcessos>
    {
        public void Configure(EntityTypeBuilder<ControleAcessos> builder)
        {

            builder.ToTable("ControleAcessos");
            builder.HasKey(m => m.Id);

        }
    }
}
