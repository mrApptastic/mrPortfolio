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
                    Name = "English"
                };

                var danish = new Translation() {
                    Enabled = true,
                    EnabledInWeb = true,
                    EId = Guid.NewGuid(),
                    Name = "Danish"
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
                    Translations = cssTrans
                };

                context.PortfolioQualifications.Add(css);

                // context.PortfolioQualificationTranslations.Add(new QualificationTranslation() {
                //     EId = Guid.NewGuid(),
                //     Qualification = css,
                //     Language = danish,
                //     Name = "Css",
                //     Description = "Dette er en dansk oversættelse."
                // });

                // context.PortfolioQualificationTranslations.Add(new QualificationTranslation() {
                //     EId = Guid.NewGuid(),
                //     Qualification = css,
                //     Language = english,
                //     Name = "Css",
                //     Description = "This is an English translation."
                // });


                context.SaveChanges();
            }
        }
    }
}