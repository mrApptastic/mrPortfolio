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
                Language = translation?.Language
            };
        }

 
        // public static List<CertificateTranslationOpen> MapCertificateTranslationToOpenModels (ICollection<Certificate> certificates) {
        //     List<CertificateTranslationOpen> certificateList = new List<CertificateTranslationOpen>();

        //     foreach(var certificate in certificates) {
        //         certificateList.Add(MapCertificateTranslationToOpenModel(certificate));
        //     }

        //     return certificateList;
        // }
        // #endregion
        // #region Education
        // public static EducationOpen MapEducationToOpenModel (Education education) {
        //     return new EducationOpen() {
        //         Translations = MapEducationTranslationToOpenModels(education.Translations)
        //     };
        // }

        // public static EducationTranslationOpen MapEducationTranslationToOpenModel (EducationTranslation translation) {
        //     return new EducationTranslationOpen() {
        //         Name = translation.Name,
        //         Description = translation.Description,
        //         Language = MapTranslationToOpenModel(translation.Language)
        //     };
        // }

        // public static List<EducationTranslationOpen> MapEducationTranslationToOpenModels (ICollection<EducationTranslation> education) {
        //     List<EducationTranslationOpen> educationList = new List<EducationTranslationOpen>();

        //     foreach(var educate in education) {
        //         educationList.Add(MapEducationTranslationToOpenModel(educate));
        //     }

        //     return educationList;
        // }
        #endregion

        // public static TranslationOpen MapTranslationToOpenModel (Translation translation) {
        //     return new TranslationOpen() {
        //         Name = translation.Name
        //     };
        // }

    }


        
}
