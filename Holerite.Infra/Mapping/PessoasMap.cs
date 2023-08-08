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
    public class PessoasMap : IEntityTypeConfiguration<Pessoas>
    {
        public void Configure(EntityTypeBuilder<Pessoas> builder)
        {
            
            builder.ToTable("Pessoas");
            builder.HasKey(m => m.Id);

        }
    }
}

