using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Holerite.Infra.Mapping
{
    public class ArquivoDocumentosMap : IEntityTypeConfiguration<ArquivoDocumentos>
    {
        public void Configure(EntityTypeBuilder<ArquivoDocumentos> builder)
        {

            builder.ToTable("ArquivoDocumentos");
            builder.HasKey(m => m.Id);

        }
    }
}
