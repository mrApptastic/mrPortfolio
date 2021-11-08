using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PortfolioAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioAPI.Data
{
    public class ApplicationDbContext: DbContext {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
            { }

        public DbSet<Certificate> PortfolioCertificates { get; set; }        
        public DbSet<Education> PortfolioEducations { get; set; }        
        public DbSet<Experience> PortfolioExperiences { get; set; }        
        public DbSet<Interest> PortfolioInterests { get; set; }
        public DbSet<Language> PortfolioLanguages { get; set; }        
        public DbSet<Project> PortfolioProjects { get; set; }        
        public DbSet<Qualification> PortfolioQualifications { get; set; } 
        public DbSet<QualificationTranslation> PortfolioQualificationTranslations { get; set; }        
        public DbSet<Translation>  PortfolioTranslations { get; set; }
    }
}   

