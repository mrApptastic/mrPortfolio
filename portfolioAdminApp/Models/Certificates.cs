
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace portfolioAdminApp.Models
{
    public class Certificate : CertificateView
    {  
        [Key]
        public int Id { get; set; }  
        public bool Enabled { get; set; }
        public bool EnabledInWeb { get; set; } 
    }  

    public class CertificateView 
    {
        public Guid? EId { get; set; } 
        public ICollection<CertificateTranslationView> Translations { get; set; }
    }

    public class CertificateTranslation : CertificateTranslationView
    {
        [Key]
        public int Id { get; set; }
    }

    public class CertificateTranslationView {
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class CertificateTranslationOpen {    
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

