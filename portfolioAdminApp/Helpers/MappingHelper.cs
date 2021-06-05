using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using admin_app.Data;
using admin_app.Models;

namespace admin_app.Helpers
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
                Translations = null,
                Name = translation.
            };
        }

        public static ICollection<CertificateTranslationView> MapCertificateTranslationToViewModels (ICollection<CertificateTranslation> certificates) {
            ICollection<CertificateTranslationView> certificateList = new List<CertificateTranslationView>();

            return certificateList;
        }

    }


        
}
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }