using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Holerite.Infra.Mapping
{
    public class LoginMap : IEntityTypeConfiguration<Login>
    {
        public void Configure(EntityTypeBuilder<Login> builder)
        {

            builder.ToTable("Login");
            builder.HasKey(m => m.Id);

        }
    }
}
