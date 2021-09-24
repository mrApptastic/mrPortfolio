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
        public static List<CertificateView> MapCertificatesToViewModel (List<Certificate> certificate) {
            return MapCertificateTranslationToOpenModels(certificate.Translations);
        }

        public static List<CertificateView> MapCertificatesToViewModel (List<Certificate> certificate) {
            return MapCertificateTranslationToOpenModels(certificate.Translations);
        }

        public static CertificateTranslationOpen MapCertificateTranslationToOpenModel (CertificateTranslation translation) {
            return new CertificateTranslationOpen() {
                Name = translation.Name,
                Description = translation.Description
            };
        }

        public static List<CertificateTranslationOpen> MapCertificateToOpenModel (Certificate certificate) {
            return MapCertificateTranslationToOpenModels(certificate.Translations);
        }

        public static CertificateTranslationOpen MapCertificateTranslationToOpenModel (CertificateTranslation translation) {
            return new CertificateTranslationOpen() {
                Name = translation.Name,
                Description = translation.Description
            };
        }

        public static List<CertificateTranslationOpen> MapCertificateTranslationToOpenModels (ICollection<CertificateTranslation> certificates) {
            List<CertificateTranslationOpen> certificateList = new List<CertificateTranslationOpen>();

            foreach(var certificate in certificates) {
                certificateList.Add(MapCertificateTranslationToOpenModel(certificate));
            }

            return certificateList;
        }
        #endregion
        #region Education
        public static EducationOpen MapEducationToOpenModel (Education education) {
            return new EducationOpen() {
                Translations = MapEducationTranslationToOpenModels(education.Translations)
            };
        }

        public static EducationTranslationOpen MapEducationTranslationToOpenModel (EducationTranslation translation) {
            return new EducationTranslationOpen() {
                Name = translation.Name,
                Description = translation.Description,
                Language = MapTranslationToOpenModel(translation.Language)
            };
        }

        public static List<EducationTranslationOpen> MapEducationTranslationToOpenModels (ICollection<EducationTranslation> education) {
            List<EducationTranslationOpen> educationList = new List<EducationTranslationOpen>();

            foreach(var educate in education) {
                educationList.Add(MapEducationTranslationToOpenModel(educate));
            }

            return educationList;
        }
        #endregion

        public static TranslationOpen MapTranslationToOpenModel (Translation translation) {
            return new TranslationOpen() {
                Name = translation.Name
            };
        }

    }


        
}
