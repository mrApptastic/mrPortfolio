using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioRepo.Migrations
{
    public partial class langCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LanguageCode",
                table: "PortfolioTranslations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LanguageCode",
                table: "PortfolioTranslations");
        }
    }
}
