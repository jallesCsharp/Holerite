using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Holerite.Infra.Migrations
{
    /// <inheritdoc />
    public partial class DataRowFuncionalidades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder
                .InsertData("Funcionalidades", 
                new string[] { "Id", "Menu", "Modulo", "Ativo", "Created" },
                new object[] { Guid.NewGuid(), "MOD_HOME", "MOD_HOME", true, DateTime.UtcNow });

            migrationBuilder
                .InsertData("Funcionalidades", 
                new string[] { "Id", "Menu", "Modulo", "Ativo", "Created" },
                new object[] { Guid.NewGuid(), "USUARIOS", "USUARIOS_PERFIL", true, DateTime.UtcNow });

            migrationBuilder
                .InsertData("Funcionalidades", 
                new string[] { "Id", "Menu", "Modulo", "Ativo", "Created" },
                new object[] { Guid.NewGuid(), "USUARIOS", "USUARIOS_LISTAR", true, DateTime.UtcNow });

            migrationBuilder
                .InsertData("Funcionalidades", 
                new string[] { "Id", "Menu", "Modulo", "Ativo", "Created" },
                new object[] { Guid.NewGuid(), "HOLERITE", "HOLERITE_ARQUIVO", true, DateTime.UtcNow });

            migrationBuilder
                .InsertData("Funcionalidades", 
                new string[] { "Id", "Menu", "Modulo", "Ativo", "Created" },
                new object[] { Guid.NewGuid(), "HOLERITE", "HOLERITE_PENDENTE_NOTIFICACAO", true, DateTime.UtcNow });

            migrationBuilder
                .InsertData("Funcionalidades", 
                new string[] { "Id", "Menu", "Modulo", "Ativo", "Created" },
                new object[] { Guid.NewGuid(), "HOLERITE", "HOLERITE_LISTA", true, DateTime.UtcNow });

            migrationBuilder
                .InsertData("Funcionalidades", 
                new string[] { "Id", "Menu", "Modulo", "Ativo", "Created" },
                new object[] { Guid.NewGuid(), "CONFIGURACAO", "CONFIGURACAO_ARQUIVOS", true, DateTime.UtcNow });

            migrationBuilder
                .InsertData("Funcionalidades", 
                new string[] { "Id", "Menu", "Modulo", "Ativo", "Created" },
                new object[] { Guid.NewGuid(), "CONFIGURACAO", "CONFIGURACAO_PERFIL_GRUPOS", true, DateTime.UtcNow });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
