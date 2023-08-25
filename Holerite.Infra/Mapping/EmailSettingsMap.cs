using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Holerite.Infra.Mapping
{
    public class EmailSettingsMap : IEntityTypeConfiguration<EmailSettings>
    {
        public void Configure(EntityTypeBuilder<EmailSettings> builder)
        {

            builder.ToTable("EmailSettings");
            builder.HasKey(m => m.Id);

        }
    }
}
