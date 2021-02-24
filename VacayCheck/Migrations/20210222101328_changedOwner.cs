using Microsoft.EntityFrameworkCore.Migrations;

namespace VacayCheck.Migrations
{
    public partial class changedOwner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Owners_Ownerid",
                table: "Properties");

            migrationBuilder.DropIndex(
                name: "IX_Properties_Ownerid",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Ownerid",
                table: "Properties");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Ownerid",
                table: "Properties",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Properties_Ownerid",
                table: "Properties",
                column: "Ownerid");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Owners_Ownerid",
                table: "Properties",
                column: "Ownerid",
                principalTable: "Owners",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
