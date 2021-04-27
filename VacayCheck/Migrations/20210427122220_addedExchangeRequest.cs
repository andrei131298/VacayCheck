using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VacayCheck.Migrations
{
    public partial class addedExchangeRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExchangeRequests",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    requesterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    requesterApartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    responderApartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    checkIn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    checkOut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    numberOfPersons = table.Column<int>(type: "int", nullable: false),
                    apartmentid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    userid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExchangeRequests", x => x.id);
                    table.ForeignKey(
                        name: "FK_ExchangeRequests_Apartments_apartmentid",
                        column: x => x.apartmentid,
                        principalTable: "Apartments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExchangeRequests_Users_userid",
                        column: x => x.userid,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExchangeRequests_apartmentid",
                table: "ExchangeRequests",
                column: "apartmentid");

            migrationBuilder.CreateIndex(
                name: "IX_ExchangeRequests_userid",
                table: "ExchangeRequests",
                column: "userid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExchangeRequests");
        }
    }
}
