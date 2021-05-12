using Microsoft.EntityFrameworkCore.Migrations;

namespace VacayCheck.Migrations
{
    public partial class AddedMailVerification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "prefferedCurrency",
                table: "Users");

            migrationBuilder.AddColumn<bool>(
                name: "isMailVerificated",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isMailVerificated",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "prefferedCurrency",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
