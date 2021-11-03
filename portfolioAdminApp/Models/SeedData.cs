using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using portfolioAdminApp.Models;
using portfolioAdminApp.Data;
using System;

namespace portfolioAdminApp {
    public class SeedData {

        public static void SeedDatabase(ApplicationDbContext context) {
            if (context.Database.GetMigrations().Count() > 0
                    && context.Database.GetPendingMigrations().Count() == 0
                    && context.PortfolioTranslations.Count() == 0) {

                var english = new Translation() {
                    Enabled = true,
                    EnabledInWeb = true,
                    EId = Guid.NewGuid(),
                    Name = "English",
                    LanguageCode = "en-GB"
                    
                };

                var danish = new Translation() {
                    Enabled = true,
                    EnabledInWeb = true,
                    EId = Guid.NewGuid(),
                    Name = "Danish",
                    LanguageCode = "da-DK"
                };
                
                var cssTrans = new List<QualificationTranslation>();

                cssTrans.Add(new QualificationTranslation() {
                    EId = Guid.NewGuid(),
                    Language = danish,
                    Name = "Css",
                    Description = "Dette er en dansk oversættelse."
                });

                cssTrans.Add(new QualificationTranslation() {
                    EId = Guid.NewGuid(),
                    Language = english,
                    Name = "Css",
                    Description = "This is an English translation."
                });

                var css = new Qualification() {
                    Enabled = true,
                    EnabledInWeb = true,
                    EId = Guid.NewGuid(),
                    ImageUrl = "",
                    Translations = cssTrans
                };

                context.PortfolioQualifications.Add(css);

                var adobeTrans = new List<CertificateTranslation>();

                adobeTrans.Add(new CertificateTranslation() {
                    EId = Guid.NewGuid(),
                    Language = danish,
                    Name = "Adobe Creative Suite 5",
                    Place = "UCN",
                    Description = "Dette er en dansk oversættelse."
                });

                adobeTrans.Add(new CertificateTranslation() {
                    EId = Guid.NewGuid(),
                    Language = english,
                    Name = "Adobe Creative Suite 5",
                    Place = "UCN",
                    Description = "This is an English translation."
                });

                var adobe = new Certificate() {
                    Enabled = true,
                    EnabledInWeb = true,
                    ImageUrl = "",
                    From = DateTime.Now,
                    To = DateTime.Now.AddMonths(1),
                    EId = Guid.NewGuid(),
                    Translations = adobeTrans
                };

                var deleteTrans = new List<CertificateTranslation>();

                deleteTrans.Add(new CertificateTranslation() {
                    EId = Guid.NewGuid(),
                    Language = danish,
                    Name = "Ikke se på mig",
                    Place = "UCN",
                    Description = "Dette er en dansk oversættelse."
                });

                deleteTrans.Add(new CertificateTranslation() {
                    EId = Guid.NewGuid(),
                    Language = english,
                    Name = "This should not be seen",
                    Place = "UCN",
                    Description = "This is an English translation."
                });

                var deleted = new Certificate() {
                    Enabled = true,
                    EnabledInWeb = false,
                    ImageUrl = "",
                    From = DateTime.Now,
                    To = DateTime.Now.AddMonths(1),
                    EId = Guid.NewGuid(),
                    Translations = adobeTrans
                };

                context.PortfolioCertificates.Add(adobe);                
                context.PortfolioCertificates.Add(deleted);

                context.SaveChanges();
            }
        }
    }
}