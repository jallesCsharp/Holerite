using Holerite.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Holerite.Infra
{
    public class HoleriteContext : DbContext
    {
        public HoleriteContext(DbContextOptions<HoleriteContext> options) : base(options)
        {
        }
        public DbSet<Pessoas> Pessoa { get; set; }
        public DbSet<Empresas> Empresa { get; set; }
        public DbSet<Profissoes> Profissao { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Pessoas>().HasKey(m => m.Id);
            base.OnModelCreating(builder);

            builder.Entity<Empresas>().HasKey(m => m.Id);
            base.OnModelCreating(builder);

            builder.Entity<Profissoes>().HasKey(m => m.Id);
            base.OnModelCreating(builder);
        }
    }
}
