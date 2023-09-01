using FluentValidation.Results;
using Holerite.Core.Interfaces.Repositories;
using Holerite.Core.Mediator.Interfaces;
using Holerite.Core.Messages;
using Holerite.Core.Models;
using Holerite.Infra.Extensions;
using Holerite.Infra.Mapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data.Common;

namespace Holerite.Infra
{
    public class HoleriteContext : DbContext, IUnitOfWork
    {
        private readonly IMediatorHandler _mediatorHandler;
        public HoleriteContext(DbContextOptions<HoleriteContext> options, IMediatorHandler mediatorHandler) 
            : base(options)
        {
            _mediatorHandler = mediatorHandler;
        }

        public DbSet<ArquivoDocumentos> ArquivoDocumentos { get; set; }
        public DbSet<Arquivos> Arquivos { get; set; }
        public DbSet<Pessoas> Pessoas { get; set; }
        public DbSet<Empresas> Empresas { get; set; }
        public DbSet<Profissoes> Profissoes { get; set; }
        public DbSet<Login> Login { get; set; }
        public DbSet<ControleAcessos> ControleAcessos { get; set; }
        public DbSet<Perfil> Perfil { get; set; }
        public DbSet<Funcionalidades> Funcionalidades { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Ignore<ValidationResult>();
            builder.Ignore<Event>();

            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new ArquivoDocumentosMap());
            builder.ApplyConfiguration(new ArquivosMap());
            builder.ApplyConfiguration(new PessoasMap());
            builder.ApplyConfiguration(new EmpresasMap());
            builder.ApplyConfiguration(new ProfissoesMap());
            builder.ApplyConfiguration(new EmailSettingsMap());
            builder.ApplyConfiguration(new LoginMap());
            builder.ApplyConfiguration(new ControleAcessosMap());
            builder.ApplyConfiguration(new PerfilMap());
            builder.ApplyConfiguration(new FuncionalidadesMap());

          
        }

        public bool DatabaseExists()
        {
            try
            {
                return Database.GetService<IRelationalDatabaseCreator>().Exists();
            }
            catch (DbException)
            {
                return false;
            }
        }

        public async Task<bool> Commit()
        {
            if (await base.SaveChangesAsync() <= 0)
                return false;

            await _mediatorHandler.PublishEvents(this);

            return true;
        }
    }
}
