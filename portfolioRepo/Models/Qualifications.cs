
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioRepo.Models
{
    public class Qualification: QualificationSummary
    {  
        [Key]
        public int Id { get; set; }  
        public bool Enabled { get; set; }
        public bool EnabledInWeb { get; set; } 
    }  

    public class QualificationSummary
    {
        public Guid? EId { get; set; }       
        public string ImageUrl { get; set; } 
        public ICollection<QualificationTranslation> Translations { get; set; }
    }

    public class QualificationTranslation : QualificationTranslationSummary
    {
        [Key]
        public int Id { get; set; }
    }

    public class QualificationTranslationSummary {
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class QualificationView {
        public Guid? EId { get; set; }
        public bool EnabledInWeb { get; set; }        
        public string ImageUrl { get; set; }
        public ICollection<QualificationTranslationView> Translations { get; set; }
    }

    public class QualificationTranslationView {
        public Guid? EId { get; set; } 
        public TranslationView Language { get; set; }  
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class QualificationTranslationOpen {    
        public string Name { get; set; }
        public string Description { get; set; }        
        public string ImageUrl { get; set; }
    }
}
