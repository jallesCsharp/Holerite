using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Holerite.Infra.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTablePessoas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CodigoFolha",
                table: "Pessoas",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Admissao",
                table: "Pessoas",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Nascimento",
                table: "Pessoas",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SalarioBase",
                table: "Pessoas",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Admissao",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "Nascimento",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "SalarioBase",
                table: "Pessoas");

            migrationBuilder.AlterColumn<int>(
                name: "CodigoFolha",
                table: "Pessoas",
                type: "integer",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
