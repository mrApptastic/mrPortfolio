﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PortfolioRepo.Data;

namespace PortfolioRepo.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20211115202106_projectUpdate")]
    partial class projectUpdate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("PortfolioRepo.Models.Certificate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("EnabledInWeb")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("From")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime?>("To")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("PortfolioCertificates");
                });

            modelBuilder.Entity("PortfolioRepo.Models.CertificateTranslation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("CertificateId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("LanguageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Place")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("CertificateId");

                    b.HasIndex("LanguageId");

                    b.ToTable("CertificateTranslation");
                });

            modelBuilder.Entity("PortfolioRepo.Models.Education", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("EnabledInWeb")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("From")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime?>("To")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("PortfolioEducations");
                });

            modelBuilder.Entity("PortfolioRepo.Models.EducationTranslation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("EducationId")
                        .HasColumnType("int");

                    b.Property<int?>("LanguageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Place")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("EducationId");

                    b.HasIndex("LanguageId");

                    b.ToTable("EducationTranslation");
                });

            modelBuilder.Entity("PortfolioRepo.Models.Experience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("EnabledInWeb")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("From")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime?>("To")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("PortfolioExperiences");
                });

            modelBuilder.Entity("PortfolioRepo.Models.ExperienceTranslation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("ExperienceId")
                        .HasColumnType("int");

                    b.Property<int?>("LanguageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Place")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("ExperienceId");

                    b.HasIndex("LanguageId");

                    b.ToTable("ExperienceTranslation");
                });

            modelBuilder.Entity("PortfolioRepo.Models.Interest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("EnabledInWeb")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("PortfolioInterests");
                });

            modelBuilder.Entity("PortfolioRepo.Models.InterestTranslation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("InterestId")
                        .HasColumnType("int");

                    b.Property<int?>("LanguageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("InterestId");

                    b.HasIndex("LanguageId");

                    b.ToTable("InterestTranslation");
                });

            modelBuilder.Entity("PortfolioRepo.Models.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("EnabledInWeb")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("PortfolioLanguages");
                });

            modelBuilder.Entity("PortfolioRepo.Models.LanguageTranslation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("LanguageId")
                        .HasColumnType("int");

                    b.Property<int?>("LanguageId1")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("LanguageId");

                    b.HasIndex("LanguageId1");

                    b.ToTable("LanguageTranslation");
                });

            modelBuilder.Entity("PortfolioRepo.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("DemoUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("DocUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("EnabledInWeb")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime?>("From")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("SourceUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime?>("To")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("PortfolioProjects");
                });

            modelBuilder.Entity("PortfolioRepo.Models.ProjectTranslation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("LanguageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Place")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int?>("ProjectId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LanguageId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectTranslation");
                });

            modelBuilder.Entity("PortfolioRepo.Models.Qualification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("EnabledInWeb")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("PortfolioQualifications");
                });

            modelBuilder.Entity("PortfolioRepo.Models.QualificationTranslation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<int?>("LanguageId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int?>("QualificationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LanguageId");

                    b.HasIndex("QualificationId");

                    b.ToTable("PortfolioQualificationTranslations");
                });

            modelBuilder.Entity("PortfolioRepo.Models.Translation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<Guid?>("EId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("Enabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("EnabledInWeb")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LanguageCode")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("PortfolioTranslations");
                });

            modelBuilder.Entity("PortfolioRepo.Models.CertificateTranslation", b =>
                {
                    b.HasOne("PortfolioRepo.Models.Certificate", null)
                        .WithMany("Translations")
                        .HasForeignKey("CertificateId");

                    b.HasOne("PortfolioRepo.Models.Translation", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId");
                });

            modelBuilder.Entity("PortfolioRepo.Models.EducationTranslation", b =>
                {
                    b.HasOne("PortfolioRepo.Models.Education", null)
                        .WithMany("Translations")
                        .HasForeignKey("EducationId");

                    b.HasOne("PortfolioRepo.Models.Translation", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId");
                });

            modelBuilder.Entity("PortfolioRepo.Models.ExperienceTranslation", b =>
                {
                    b.HasOne("PortfolioRepo.Models.Experience", null)
                        .WithMany("Translations")
                        .HasForeignKey("ExperienceId");

                    b.HasOne("PortfolioRepo.Models.Translation", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId");
                });

            modelBuilder.Entity("PortfolioRepo.Models.InterestTranslation", b =>
                {
                    b.HasOne("PortfolioRepo.Models.Interest", null)
                        .WithMany("Translations")
                        .HasForeignKey("InterestId");

                    b.HasOne("PortfolioRepo.Models.Translation", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId");
                });

            modelBuilder.Entity("PortfolioRepo.Models.LanguageTranslation", b =>
                {
                    b.HasOne("PortfolioRepo.Models.Language", null)
                        .WithMany("Translations")
                        .HasForeignKey("LanguageId");

                    b.HasOne("PortfolioRepo.Models.Translation", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId1");
                });

            modelBuilder.Entity("PortfolioRepo.Models.ProjectTranslation", b =>
                {
                    b.HasOne("PortfolioRepo.Models.Translation", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId");

                    b.HasOne("PortfolioRepo.Models.Project", null)
                        .WithMany("Translations")
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("PortfolioRepo.Models.QualificationTranslation", b =>
                {
                    b.HasOne("PortfolioRepo.Models.Translation", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId");

                    b.HasOne("PortfolioRepo.Models.Qualification", null)
                        .WithMany("Translations")
                        .HasForeignKey("QualificationId");
                });
#pragma warning restore 612, 618
        }
    }
}