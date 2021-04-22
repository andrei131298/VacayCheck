using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VacayCheck.Migrations
{
    public partial class citiesEdited : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Cities_cityId",
                table: "Properties");

            migrationBuilder.DropIndex(
                name: "IX_Properties_cityId",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "cityId",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "streetNumber",
                table: "Properties");

            migrationBuilder.AddColumn<string>(
                name: "cityName",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "cityName",
                table: "Properties");

            migrationBuilder.AddColumn<Guid>(
                name: "cityId",
                table: "Properties",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "streetNumber",
                table: "Properties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Properties_cityId",
                table: "Properties",
                column: "cityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Cities_cityId",
                table: "Properties",
                column: "cityId",
                principalTable: "Cities",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
