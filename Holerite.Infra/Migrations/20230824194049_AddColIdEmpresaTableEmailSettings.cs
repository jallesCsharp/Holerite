using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Holerite.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddColIdEmpresaTableEmailSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EmpresasId",
                table: "EmailSettings",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmailSettings_EmpresasId",
                table: "EmailSettings",
                column: "EmpresasId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmailSettings_Empresas_EmpresasId",
                table: "EmailSettings",
                column: "EmpresasId",
                principalTable: "Empresas",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmailSettings_Empresas_EmpresasId",
                table: "EmailSettings");

            migrationBuilder.DropIndex(
                name: "IX_EmailSettings_EmpresasId",
                table: "EmailSettings");

            migrationBuilder.DropColumn(
                name: "EmpresasId",
                table: "EmailSettings");
        }
    }
}
