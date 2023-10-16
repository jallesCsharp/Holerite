﻿// <auto-generated />
using System;
using Holerite.Infra;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Holerite.Infra.Migrations
{
    [DbContext(typeof(HoleriteContext))]
    [Migration("20230929220747_DeleteCascadeArquivoDocumentos")]
    partial class DeleteCascadeArquivoDocumentos
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Holerite.Core.Models.ArquivoDocumentos", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<byte[]>("Arquivo")
                        .HasColumnType("bytea");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Nome")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("ArquivoDocumentos", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.Arquivos", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<byte[]>("Arquivo")
                        .HasColumnType("bytea");

                    b.Property<Guid?>("ArquivoDocumentoId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool?>("EmailEnviado")
                        .HasColumnType("boolean");

                    b.Property<int?>("Mes")
                        .HasColumnType("integer");

                    b.Property<string>("NomeArquivo")
                        .HasColumnType("text");

                    b.Property<Guid?>("PessoasId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("ArquivoDocumentoId");

                    b.HasIndex("PessoasId");

                    b.ToTable("Arquivos", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.ControleAcessos", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Ativar")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("FuncionalidadesId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("PerfilId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("FuncionalidadesId");

                    b.HasIndex("PerfilId");

                    b.ToTable("ControleAcessos", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.EmailSettings", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool?>("Autenticao")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("EmpresasId")
                        .HasColumnType("uuid");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<int?>("Porta")
                        .HasColumnType("integer");

                    b.Property<bool?>("RequerSSL")
                        .HasColumnType("boolean");

                    b.Property<bool?>("RequerTLS")
                        .HasColumnType("boolean");

                    b.Property<string>("SenderNome")
                        .HasColumnType("text");

                    b.Property<string>("ServidorSMTP")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("EmpresasId");

                    b.ToTable("EmailSettings", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.Empresas", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Cnpj")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("NomeEmpresa")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Empresas", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.Funcionalidades", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Ativo")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Menu")
                        .HasColumnType("text");

                    b.Property<string>("Modulo")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Funcionalidades", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.Login", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Jwt")
                        .HasColumnType("text");

                    b.Property<string>("LoginAuth")
                        .HasColumnType("text");

                    b.Property<Guid?>("PerfilId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("PessoasId")
                        .HasColumnType("uuid");

                    b.Property<bool>("SecaoAtiva")
                        .HasColumnType("boolean");

                    b.Property<string>("Senha")
                        .HasColumnType("text");

                    b.Property<TimeSpan?>("TimeSpira")
                        .HasColumnType("interval");

                    b.Property<DateTime?>("UltimoLogin")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("PerfilId");

                    b.HasIndex("PessoasId");

                    b.ToTable("Login", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.Perfil", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<bool>("Ativo")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NomePerfil")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Perfil", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.Pessoas", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Admissao")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CodigoFolha")
                        .HasColumnType("text");

                    b.Property<string>("Cpf")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<Guid?>("EmpresasId")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Nascimento")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Nome")
                        .HasColumnType("text");

                    b.Property<string>("Pis")
                        .HasColumnType("text");

                    b.Property<Guid?>("ProfissoesId")
                        .HasColumnType("uuid");

                    b.Property<string>("SalarioBase")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("EmpresasId");

                    b.HasIndex("ProfissoesId");

                    b.ToTable("Pessoas", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.Profissoes", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("Deleted")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NomeProfissao")
                        .HasColumnType("text");

                    b.Property<DateTime?>("Updated")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Profissoes", (string)null);
                });

            modelBuilder.Entity("Holerite.Core.Models.Arquivos", b =>
                {
                    b.HasOne("Holerite.Core.Models.ArquivoDocumentos", "ArquivoDocumento")
                        .WithMany("Arquivos")
                        .HasForeignKey("ArquivoDocumentoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Holerite.Core.Models.Pessoas", "Pessoas")
                        .WithMany()
                        .HasForeignKey("PessoasId");

                    b.Navigation("ArquivoDocumento");

                    b.Navigation("Pessoas");
                });

            modelBuilder.Entity("Holerite.Core.Models.ControleAcessos", b =>
                {
                    b.HasOne("Holerite.Core.Models.Funcionalidades", "Funcionalidades")
                        .WithMany()
                        .HasForeignKey("FuncionalidadesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Holerite.Core.Models.Perfil", "Perfil")
                        .WithMany("ControleAcessos")
                        .HasForeignKey("PerfilId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Funcionalidades");

                    b.Navigation("Perfil");
                });

            modelBuilder.Entity("Holerite.Core.Models.EmailSettings", b =>
                {
                    b.HasOne("Holerite.Core.Models.Empresas", "Empresas")
                        .WithMany()
                        .HasForeignKey("EmpresasId");

                    b.Navigation("Empresas");
                });

            modelBuilder.Entity("Holerite.Core.Models.Login", b =>
                {
                    b.HasOne("Holerite.Core.Models.Perfil", "Perfil")
                        .WithMany()
                        .HasForeignKey("PerfilId");

                    b.HasOne("Holerite.Core.Models.Pessoas", "Pessoas")
                        .WithMany()
                        .HasForeignKey("PessoasId");

                    b.Navigation("Perfil");

                    b.Navigation("Pessoas");
                });

            modelBuilder.Entity("Holerite.Core.Models.Pessoas", b =>
                {
                    b.HasOne("Holerite.Core.Models.Empresas", "Empresas")
                        .WithMany()
                        .HasForeignKey("EmpresasId");

                    b.HasOne("Holerite.Core.Models.Profissoes", "Profissoes")
                        .WithMany()
                        .HasForeignKey("ProfissoesId");

                    b.Navigation("Empresas");

                    b.Navigation("Profissoes");
                });

            modelBuilder.Entity("Holerite.Core.Models.ArquivoDocumentos", b =>
                {
                    b.Navigation("Arquivos");
                });

            modelBuilder.Entity("Holerite.Core.Models.Perfil", b =>
                {
                    b.Navigation("ControleAcessos");
                });
#pragma warning restore 612, 618
        }
    }
}
