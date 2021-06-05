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
        public static CertificateView MapCertificateToViewModel (Certificate certificate) {
            return new CertificateView() {
                EId = certificate.EId,
                Translations = MapCertificateTranslationToViewModels(certificate.Translations)
            };
        }

        public static CertificateTranslationView MapCertificateTranslationToViewModel (CertificateTranslation translation) {
            return new CertificateTranslationView() {
                EId = translation.EId,
                Name = translation.Name,
                Description = translation.Description
            };
        }

        public static List<CertificateTranslation> MapCertificateTranslationToViewModels (ICollection<CertificateTranslation> certificates) {
            List<CertificateTranslation> certificateList = new List<CertificateTranslation>();

            foreach(var certificate in certificates) {
                certificateList.Add((CertificateTranslation)MapCertificateTranslationToViewModel(certificate));
            }

            return certificateList;
        }

    }


        
}
