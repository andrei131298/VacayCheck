using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VacayCheck.Migrations
{
    public partial class addedExchangeRequest2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExchangeRequests_Apartments_apartmentid",
                table: "ExchangeRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_ExchangeRequests_Users_userid",
                table: "ExchangeRequests");

            migrationBuilder.DropIndex(
                name: "IX_ExchangeRequests_apartmentid",
                table: "ExchangeRequests");

            migrationBuilder.DropIndex(
                name: "IX_ExchangeRequests_userid",
                table: "ExchangeRequests");

            migrationBuilder.DropColumn(
                name: "apartmentid",
                table: "ExchangeRequests");

            migrationBuilder.DropColumn(
                name: "userid",
                table: "ExchangeRequests");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "apartmentid",
                table: "ExchangeRequests",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "userid",
                table: "ExchangeRequests",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ExchangeRequests_apartmentid",
                table: "ExchangeRequests",
                column: "apartmentid");

            migrationBuilder.CreateIndex(
                name: "IX_ExchangeRequests_userid",
                table: "ExchangeRequests",
                column: "userid");

            migrationBuilder.AddForeignKey(
                name: "FK_ExchangeRequests_Apartments_apartmentid",
                table: "ExchangeRequests",
                column: "apartmentid",
                principalTable: "Apartments",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExchangeRequests_Users_userid",
                table: "ExchangeRequests",
                column: "userid",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
