using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using portfolioAdminApp.Data;
using portfolioAdminApp.Models;

namespace portfolioAdminApp.Helpers
{
    public class MappingHelper
    {
        #region Certificates
        public static CertificateView MapCertificateToViewModel (Certificate certificate) {
         return new CertificateView() {
             EId = certificate.EId,
             EnabledInWeb = certificate.EnabledInWeb,
             Translations = MapCertificateTranslationToOpenModels(certificate.Translations)
            };
        }

        public static List<CertificateTranslationView> MapCertificateTranslationToOpenModels (ICollection<CertificateTranslation> translations) {
            List<CertificateTranslationView> certificateTranslationsList = new List<CertificateTranslationView>();

            foreach(var translation in translations) {
                certificateTranslationsList.Add(MapCertificateTranslationToOpenModel(translation));
            }

            return certificateTranslationsList;
        }

        public static CertificateTranslationView MapCertificateTranslationToOpenModel (CertificateTranslation translation) {
            return new CertificateTranslationView() {
                EId = translation.EId,
                Name = translation.Name,
                Description = translation.Description,
                Language = translation.Language
            };
        }
        #endregion

        #region Educations
        public static EducationView MapEducationToViewModel (Education education) {
         return new EducationView() {
             EId = education.EId,
             EnabledInWeb = education.EnabledInWeb,
             Translations = MapEducationTranslationToOpenModels(education.Translations)
            };
        }

        public static List<EducationTranslationView> MapEducationTranslationToOpenModels (ICollection<EducationTranslation> translations) {
            List<EducationTranslationView> educationTranslationsList = new List<EducationTranslationView>();

            foreach(var translation in translations) {
                educationTranslationsList.Add(MapEducationTranslationToOpenModel(translation));
            }

            return educationTranslationsList;
        }

        public static EducationTranslationView MapEducationTranslationToOpenModel (EducationTranslation translation) {
            return new EducationTranslationView() {
                EId = translation.EId,
                Name = translation.Name,
                Description = translation.Description,
                Language = translation.Language
            };
        }
        #endregion

        #region Experiences
        public static ExperienceView MapExperienceToViewModel (Experience experience) {
         return new ExperienceView() {
             EId = experience.EId,
             EnabledInWeb = experience.EnabledInWeb,
             Translations = MapExperienceTranslationToOpenModels(experience.Translations)
            };
        }

        public static List<ExperienceTranslationView> MapExperienceTranslationToOpenModels (ICollection<ExperienceTranslation> translations) {
            List<ExperienceTranslationView> experienceTranslationsList = new List<ExperienceTranslationView>();

            foreach(var translation in translations) {
                experienceTranslationsList.Add(MapExperienceTranslationToOpenModel(translation));
            }

            return experienceTranslationsList;
        }

        public static ExperienceTranslationView MapExperienceTranslationToOpenModel (ExperienceTranslation translation) {
            return new ExperienceTranslationView() {
                EId = translation.EId,
                Name = translation.Name,
                Description = translation.Description,
                Language = translation.Language
            };
        }
        #endregion

        #region Interests
        public static InterestView MapInterestToViewModel (Interest interest) {
         return new InterestView() {
             EId = interest.EId,
             EnabledInWeb = interest.EnabledInWeb,
             Translations = MapInterestTranslationToOpenModels(interest.Translations)
            };
        }

        public static List<InterestTranslationView> MapInterestTranslationToOpenModels (ICollection<InterestTranslation> translations) {
            List<InterestTranslationView> interestTranslationsList = new List<InterestTranslationView>();

            foreach(var translation in translations) {
                interestTranslationsList.Add(MapInterestTranslationToOpenModel(translation));
            }

            return interestTranslationsList;
        }

        public static InterestTranslationView MapInterestTranslationToOpenModel (InterestTranslation translation) {
            return new InterestTranslationView() {
                EId = translation.EId,
                Name = translation.Name,
                Description = translation.Description,
                Language = translation.Language
            };
        }
        #endregion

        #region Languages
        public static LanguageView MapLanguageToViewModel (Language language) {
         return new LanguageView() {
             EId = language.EId,
             EnabledInWeb = language.EnabledInWeb,
             Translations = MapLanguageTranslationToOpenModels(language.Translations)
            };
        }

        public static List<LanguageTranslationView> MapLanguageTranslationToOpenModels (ICollection<LanguageTranslation> translations) {
            List<LanguageTranslationView> languageTranslationsList = new List<LanguageTranslationView>();

            foreach(var translation in translations) {
                languageTranslationsList.Add(MapLanguageTranslationToOpenModel(translation));
            }

            return languageTranslationsList;
        }

        public static LanguageTranslationView MapLanguageTranslationToOpenModel (LanguageTranslation translation) {
            return new LanguageTranslationView() {
                EId = translation.EId,
                Name = translation.Name,
                Description = translation.Description,
                Language = translation.Language
            };
        }
        #endregion

        #region Projects
        public static ProjectView MapProjectToViewModel (Project project) {
         return new ProjectView() {
             EId = project.EId,
             EnabledInWeb = project.EnabledInWeb,
             Translations = MapProjectTranslationToOpenModels(project.Translations)
            };
        }

        public static List<ProjectTranslationView> MapProjectTranslationToOpenModels (ICollection<ProjectTranslation> translations) {
            List<ProjectTranslationView> projectTranslationsList = new List<ProjectTranslationView>();

            foreach(var translation in translations) {
                projectTranslationsList.Add(MapProjectTranslationToOpenModel(translation));
            }

            return projectTranslationsList;
        }

        public static ProjectTranslationView MapProjectTranslationToOpenModel (ProjectTranslation translation) {
            return new ProjectTranslationView() {
                EId = translation.EId,
                Name = translation.Name,
                Description = translation.Description,
                Language = translation.Language
            };
        }
        #endregion

        #region Qualifications
        public static QualificationView MapQualificationToViewModel (Qualification project) {
         return new QualificationView() {
             EId = project.EId,
             EnabledInWeb = project.EnabledInWeb,
             Translations = MapQualificationTranslationToOpenModels(project.Translations)
            };
        }

        public static List<QualificationTranslationView> MapQualificationTranslationToOpenModels (ICollection<QualificationTranslation> translations) {
            List<QualificationTranslationView> projectTranslationsList = new List<QualificationTranslationView>();

            foreach(var translation in translations) {
                projectTranslationsList.Add(MapQualificationTranslationToOpenModel(translation));
            }

            return projectTranslationsList;
        }

        public static QualificationTranslationView MapQualificationTranslationToOpenModel (QualificationTranslation translation) {
            return new QualificationTranslationView() {
                EId = translation.EId,
                Name = translation.Name,
                Description = translation.Description,
                Language = translation.Language
            };
        }
        #endregion
    }        
}
