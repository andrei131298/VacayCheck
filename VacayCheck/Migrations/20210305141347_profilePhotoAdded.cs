using Microsoft.EntityFrameworkCore.Migrations;

namespace VacayCheck.Migrations
{
    public partial class profilePhotoAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "profilePhoto",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "profilePhoto",
                table: "Users");
        }
    }
}
