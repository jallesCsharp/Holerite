using Holerite.Core.Interfaces.Repositories.Controler;
using Holerite.Core.Interfaces.Services.Controler;
using Holerite.Infra.Repositories.Controler;
using Microsoft.EntityFrameworkCore.Migrations;
using XUtilities.NetCore6.Seguranca;

#nullable disable

namespace Holerite.Infra.Migrations
{
    /// <inheritdoc />
    public partial class DataRowUserAdm : Migration
    {
        
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder
                .InsertData("Perfil",
                new string[] { "Id", "NomePerfil", "Ativo"},
                new object[] { Guid.NewGuid(), "ADMINISTRADOR", true});

            migrationBuilder
                .InsertData("Login",
                new string[] { "Id", "LoginAuth", "Senha", "SecaoAtiva", "UltimoLogin" },
                new object[] { Guid.NewGuid(), "Holerite", $"{XAesCrip.Criptografar("@super@")}", false, DateTime.UtcNow });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
