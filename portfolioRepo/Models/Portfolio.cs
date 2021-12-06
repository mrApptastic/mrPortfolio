
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioRepo.Models 
{
    public class PortfolioOpen {
        public ICollection<CertificateTranslationOpen> Certificates { get; set; }
        public ICollection<EducationTranslationOpen> Educations { get; set; }
        public ICollection<ExperienceTranslationOpen> Experiences { get; set; }
        public ICollection<InterestTranslationOpen> Interests { get; set; }
        public ICollection<LanguageTranslationOpen> Languages { get; set; }
        public ICollection<ProjectTranslationOpen> Projects { get; set; }
        public ICollection<QualificationTranslationOpen> Qualifications { get; set; }
    }
}
