
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace portfolioAdminApp.Models
{
    public class Education : EducationSummary
    {  
        [Key]
        public int Id { get; set; }  
        public bool Enabled { get; set; }
        public bool EnabledInWeb { get; set; } 
    }  

    public class EducationSummary
    {
        public Guid? EId { get; set; } 
        public ICollection<EducationTranslation> Translations { get; set; }
    }

    public class EducationTranslation : EducationTranslationSummary
    {
        [Key]
        public int Id { get; set; }
    }

    public class EducationTranslationSummary {
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class EducationView {
        public Guid? EId { get; set; }
        public bool EnabledInWeb { get; set; } 
        public ICollection<EducationTranslationView> Translations { get; set; }
    }

    public class EducationTranslationView {
        public Guid? EId { get; set; } 
        public TranslationView Language { get; set; }  
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class EducationTranslationOpen {    
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
