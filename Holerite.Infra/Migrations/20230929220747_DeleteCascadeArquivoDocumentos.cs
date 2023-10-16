using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Holerite.Infra.Migrations
{
    /// <inheritdoc />
    public partial class DeleteCascadeArquivoDocumentos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Arquivos_ArquivoDocumentos_ArquivoDocumentoId",
                table: "Arquivos");

            migrationBuilder.AddForeignKey(
                name: "FK_Arquivos_ArquivoDocumentos_ArquivoDocumentoId",
                table: "Arquivos",
                column: "ArquivoDocumentoId",
                principalTable: "ArquivoDocumentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Arquivos_ArquivoDocumentos_ArquivoDocumentoId",
                table: "Arquivos");

            migrationBuilder.AddForeignKey(
                name: "FK_Arquivos_ArquivoDocumentos_ArquivoDocumentoId",
                table: "Arquivos",
                column: "ArquivoDocumentoId",
                principalTable: "ArquivoDocumentos",
                principalColumn: "Id");
        }
    }
}
