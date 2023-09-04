using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Holerite.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddTableLoginPerfilFuncionalidadesControleAcesso : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Funcionalidades",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Menu = table.Column<string>(type: "text", nullable: true),
                    Modulo = table.Column<string>(type: "text", nullable: true),
                    Ativo = table.Column<bool>(type: "boolean", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Deleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Funcionalidades", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Perfil",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NomePerfil = table.Column<string>(type: "text", nullable: true),
                    Ativo = table.Column<bool>(type: "boolean", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Deleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perfil", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ControleAcessos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PerfilId = table.Column<Guid>(type: "uuid", nullable: false),
                    FuncionalidadesId = table.Column<Guid>(type: "uuid", nullable: false),
                    Ativar = table.Column<bool>(type: "boolean", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Deleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ControleAcessos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ControleAcessos_Funcionalidades_FuncionalidadesId",
                        column: x => x.FuncionalidadesId,
                        principalTable: "Funcionalidades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ControleAcessos_Perfil_PerfilId",
                        column: x => x.PerfilId,
                        principalTable: "Perfil",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Login",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PessoasId = table.Column<Guid>(type: "uuid", nullable: true),
                    PerfilId = table.Column<Guid>(type: "uuid", nullable: true),
                    LoginAuth = table.Column<string>(type: "text", nullable: true),
                    Senha = table.Column<string>(type: "text", nullable: true),
                    SecaoAtiva = table.Column<bool>(type: "boolean", nullable: false),
                    TimeSpira = table.Column<TimeSpan>(type: "interval", nullable: true),
                    UltimoLogin = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Jwt = table.Column<string>(type: "text", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Updated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Deleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Login", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Login_Perfil_PerfilId",
                        column: x => x.PerfilId,
                        principalTable: "Perfil",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Login_Pessoas_PessoasId",
                        column: x => x.PessoasId,
                        principalTable: "Pessoas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ControleAcessos_FuncionalidadesId",
                table: "ControleAcessos",
                column: "FuncionalidadesId");

            migrationBuilder.CreateIndex(
                name: "IX_ControleAcessos_PerfilId",
                table: "ControleAcessos",
                column: "PerfilId");

            migrationBuilder.CreateIndex(
                name: "IX_Login_PerfilId",
                table: "Login",
                column: "PerfilId");

            migrationBuilder.CreateIndex(
                name: "IX_Login_PessoasId",
                table: "Login",
                column: "PessoasId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ControleAcessos");

            migrationBuilder.DropTable(
                name: "Login");

            migrationBuilder.DropTable(
                name: "Funcionalidades");

            migrationBuilder.DropTable(
                name: "Perfil");
        }
    }
}
