using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PortfolioRepo.Migrations
{
    public partial class initialPublicAPI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PortfolioCertificates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    From = table.Column<DateTime>(nullable: true),
                    To = table.Column<DateTime>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    EnabledInWeb = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioCertificates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioEducations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    From = table.Column<DateTime>(nullable: true),
                    To = table.Column<DateTime>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    EnabledInWeb = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioEducations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioExperiences",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    From = table.Column<DateTime>(nullable: true),
                    To = table.Column<DateTime>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    EnabledInWeb = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioExperiences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioInterests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    EnabledInWeb = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioInterests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioLanguages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    EnabledInWeb = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioLanguages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioProjects",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    From = table.Column<DateTime>(nullable: true),
                    To = table.Column<DateTime>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    DemoUrl = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    EnabledInWeb = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioProjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioQualifications",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    EnabledInWeb = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioQualifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioTranslations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    LanguageCode = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Enabled = table.Column<bool>(nullable: false),
                    EnabledInWeb = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioTranslations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CertificateTranslation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    LanguageId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Place = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CertificateId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CertificateTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CertificateTranslation_PortfolioCertificates_CertificateId",
                        column: x => x.CertificateId,
                        principalTable: "PortfolioCertificates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CertificateTranslation_PortfolioTranslations_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "PortfolioTranslations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EducationTranslation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    LanguageId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Place = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    EducationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EducationTranslation_PortfolioEducations_EducationId",
                        column: x => x.EducationId,
                        principalTable: "PortfolioEducations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EducationTranslation_PortfolioTranslations_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "PortfolioTranslations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateTable(
                name: "InterestTranslation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    LanguageId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    InterestId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterestTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterestTranslation_PortfolioInterests_InterestId",
                        column: x => x.InterestId,
                        principalTable: "PortfolioInterests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InterestTranslation_PortfolioTranslations_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "PortfolioTranslations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LanguageTranslation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    LanguageId1 = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    LanguageId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LanguageTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LanguageTranslation_PortfolioLanguages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "PortfolioLanguages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LanguageTranslation_PortfolioTranslations_LanguageId1",
                        column: x => x.LanguageId1,
                        principalTable: "PortfolioTranslations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PortfolioQualificationTranslations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    LanguageId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    QualificationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioQualificationTranslations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PortfolioQualificationTranslations_PortfolioTranslations_Lan~",
                        column: x => x.LanguageId,
                        principalTable: "PortfolioTranslations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PortfolioQualificationTranslations_PortfolioQualifications_Q~",
                        column: x => x.QualificationId,
                        principalTable: "PortfolioQualifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTranslation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EId = table.Column<Guid>(nullable: true),
                    LanguageId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Place = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ProjectId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTranslation_PortfolioTranslations_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "PortfolioTranslations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectTranslation_PortfolioProjects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "PortfolioProjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CertificateTranslation_CertificateId",
                table: "CertificateTranslation",
                column: "CertificateId");

            migrationBuilder.CreateIndex(
                name: "IX_CertificateTranslation_LanguageId",
                table: "CertificateTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_EducationTranslation_EducationId",
                table: "EducationTranslation",
                column: "EducationId");

            migrationBuilder.CreateIndex(
                name: "IX_EducationTranslation_LanguageId",
                table: "EducationTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_ExperienceTranslation_ExperienceId",
                table: "ExperienceTranslation",
                column: "ExperienceId");

            migrationBuilder.CreateIndex(
                name: "IX_ExperienceTranslation_LanguageId",
                table: "ExperienceTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_InterestTranslation_InterestId",
                table: "InterestTranslation",
                column: "InterestId");

            migrationBuilder.CreateIndex(
                name: "IX_InterestTranslation_LanguageId",
                table: "InterestTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_LanguageTranslation_LanguageId",
                table: "LanguageTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_LanguageTranslation_LanguageId1",
                table: "LanguageTranslation",
                column: "LanguageId1");

            migrationBuilder.CreateIndex(
                name: "IX_PortfolioQualificationTranslations_LanguageId",
                table: "PortfolioQualificationTranslations",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_PortfolioQualificationTranslations_QualificationId",
                table: "PortfolioQualificationTranslations",
                column: "QualificationId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTranslation_LanguageId",
                table: "ProjectTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTranslation_ProjectId",
                table: "ProjectTranslation",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CertificateTranslation");

            migrationBuilder.DropTable(
                name: "EducationTranslation");

            migrationBuilder.DropTable(
                name: "ExperienceTranslation");

            migrationBuilder.DropTable(
                name: "InterestTranslation");

            migrationBuilder.DropTable(
                name: "LanguageTranslation");

            migrationBuilder.DropTable(
                name: "PortfolioQualificationTranslations");

            migrationBuilder.DropTable(
                name: "ProjectTranslation");

            migrationBuilder.DropTable(
                name: "PortfolioCertificates");

            migrationBuilder.DropTable(
                name: "PortfolioEducations");

            migrationBuilder.DropTable(
                name: "PortfolioExperiences");

            migrationBuilder.DropTable(
                name: "PortfolioInterests");

            migrationBuilder.DropTable(
                name: "PortfolioLanguages");

            migrationBuilder.DropTable(
                name: "PortfolioQualifications");

            migrationBuilder.DropTable(
                name: "PortfolioTranslations");

            migrationBuilder.DropTable(
                name: "PortfolioProjects");
        }
    }
}
