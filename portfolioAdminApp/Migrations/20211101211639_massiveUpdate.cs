using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace portfolioAdminApp.Migrations
{
    public partial class massiveUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EducationTranslation_PortfolioExperiences_ExperienceId",
                table: "EducationTranslation");

            migrationBuilder.DropIndex(
                name: "IX_EducationTranslation_ExperienceId",
                table: "EducationTranslation");

            migrationBuilder.DropColumn(
                name: "ExperienceId",
                table: "EducationTranslation");

            migrationBuilder.AddColumn<string>(
                name: "Place",
                table: "ProjectTranslation",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "PortfolioQualifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DemoUrl",
                table: "PortfolioProjects",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "PortfolioProjects",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "PortfolioProjects",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "PortfolioProjects",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "PortfolioLanguages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "PortfolioInterests",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "PortfolioExperiences",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "PortfolioExperiences",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "PortfolioExperiences",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "PortfolioEducations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "PortfolioEducations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "PortfolioEducations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "PortfolioCertificates",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "PortfolioCertificates",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "PortfolioCertificates",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Place",
                table: "EducationTranslation",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Place",
                table: "CertificateTranslation",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ExperienceTranslation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    LanguageId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Place = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ExperienceId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExperienceTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExperienceTranslation_PortfolioExperiences_ExperienceId",
                        column: x => x.ExperienceId,
                        principalTable: "PortfolioExperiences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExperienceTranslation_PortfolioTranslations_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "PortfolioTranslations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExperienceTranslation_ExperienceId",
                table: "ExperienceTranslation",
                column: "ExperienceId");

            migrationBuilder.CreateIndex(
                name: "IX_ExperienceTranslation_LanguageId",
                table: "ExperienceTranslation",
                column: "LanguageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExperienceTranslation");

            migrationBuilder.DropColumn(
                name: "Place",
                table: "ProjectTranslation");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "PortfolioQualifications");

            migrationBuilder.DropColumn(
                name: "DemoUrl",
                table: "PortfolioProjects");

            migrationBuilder.DropColumn(
                name: "From",
                table: "PortfolioProjects");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "PortfolioProjects");

            migrationBuilder.DropColumn(
                name: "To",
                table: "PortfolioProjects");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "PortfolioLanguages");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "PortfolioInterests");

            migrationBuilder.DropColumn(
                name: "From",
                table: "PortfolioExperiences");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "PortfolioExperiences");

            migrationBuilder.DropColumn(
                name: "To",
                table: "PortfolioExperiences");

            migrationBuilder.DropColumn(
                name: "From",
                table: "PortfolioEducations");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "PortfolioEducations");

            migrationBuilder.DropColumn(
                name: "To",
                table: "PortfolioEducations");

            migrationBuilder.DropColumn(
                name: "From",
                table: "PortfolioCertificates");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "PortfolioCertificates");

            migrationBuilder.DropColumn(
                name: "To",
                table: "PortfolioCertificates");

            migrationBuilder.DropColumn(
                name: "Place",
                table: "EducationTranslation");

            migrationBuilder.DropColumn(
                name: "Place",
                table: "CertificateTranslation");

            migrationBuilder.AddColumn<int>(
                name: "ExperienceId",
                table: "EducationTranslation",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EducationTranslation_ExperienceId",
                table: "EducationTranslation",
                column: "ExperienceId");

            migrationBuilder.AddForeignKey(
                name: "FK_EducationTranslation_PortfolioExperiences_ExperienceId",
                table: "EducationTranslation",
                column: "ExperienceId",
                principalTable: "PortfolioExperiences",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
