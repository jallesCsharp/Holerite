using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Holerite.Infra.Migrations
{
    /// <inheritdoc />
    public partial class CreateDataBase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArquivoDocumentos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: true),
                    Arquivo = table.Column<byte[]>(type: "bytea", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Deleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArquivoDocumentos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Empresas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NomeEmpresa = table.Column<string>(type: "text", nullable: true),
                    Cnpj = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Deleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Profissoes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NomeProfissao = table.Column<string>(type: "text", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Deleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profissoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pessoas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EmpresasId = table.Column<Guid>(type: "uuid", nullable: true),
                    ProfissoesId = table.Column<Guid>(type: "uuid", nullable: true),
                    CodigoFolha = table.Column<int>(type: "integer", nullable: true),
                    Cpf = table.Column<string>(type: "text", nullable: true),
                    Pis = table.Column<string>(type: "text", nullable: true),
                    Nome = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Deleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pessoas_Empresas_EmpresasId",
                        column: x => x.EmpresasId,
                        principalTable: "Empresas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Pessoas_Profissoes_ProfissoesId",
                        column: x => x.ProfissoesId,
                        principalTable: "Profissoes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Arquivos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PessoasId = table.Column<Guid>(type: "uuid", nullable: true),
                    ArquivoDocumentoId = table.Column<Guid>(type: "uuid", nullable: true),
                    Mes = table.Column<int>(type: "integer", nullable: true),
                    NomeArquivo = table.Column<string>(type: "text", nullable: true),
                    Arquivo = table.Column<byte[]>(type: "bytea", nullable: true),
                    EmailEnviado = table.Column<bool>(type: "boolean", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Deleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Arquivos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Arquivos_ArquivoDocumentos_ArquivoDocumentoId",
                        column: x => x.ArquivoDocumentoId,
                        principalTable: "ArquivoDocumentos",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Arquivos_Pessoas_PessoasId",
                        column: x => x.PessoasId,
                        principalTable: "Pessoas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Arquivos_ArquivoDocumentoId",
                table: "Arquivos",
                column: "ArquivoDocumentoId");

            migrationBuilder.CreateIndex(
                name: "IX_Arquivos_PessoasId",
                table: "Arquivos",
                column: "PessoasId");

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_EmpresasId",
                table: "Pessoas",
                column: "EmpresasId");

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_ProfissoesId",
                table: "Pessoas",
                column: "ProfissoesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Arquivos");

            migrationBuilder.DropTable(
                name: "ArquivoDocumentos");

            migrationBuilder.DropTable(
                name: "Pessoas");

            migrationBuilder.DropTable(
                name: "Empresas");

            migrationBuilder.DropTable(
                name: "Profissoes");
        }
    }
}
