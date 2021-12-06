
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PortfolioRepo.Models;

namespace portfolioAdminApp.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {}

        
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

