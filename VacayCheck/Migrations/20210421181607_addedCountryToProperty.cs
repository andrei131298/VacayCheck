using Microsoft.EntityFrameworkCore.Migrations;

namespace VacayCheck.Migrations
{
    public partial class addedCountryToProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "country",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "country",
                table: "Properties");
        }
    }
}
