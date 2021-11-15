using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioPublicAPI.Migrations
{
    public partial class projectUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DocUrl",
                table: "PortfolioProjects",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceUrl",
                table: "PortfolioProjects",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocUrl",
                table: "PortfolioProjects");

            migrationBuilder.DropColumn(
                name: "SourceUrl",
                table: "PortfolioProjects");
        }
    }
}
