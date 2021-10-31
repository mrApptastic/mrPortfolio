
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace portfolioAdminApp.Models
{
    public class Experience : ExperienceSummary
    {  
        [Key]
        public int Id { get; set; }  
        public bool Enabled { get; set; }
        public bool EnabledInWeb { get; set; } 
    }  

    public class ExperienceSummary
    {
        public Guid? EId { get; set; } 
        public ICollection<ExperienceTranslation> Translations { get; set; }
    }

    public class ExperienceTranslation : ExperienceTranslationSummary
    {
        [Key]
        public int Id { get; set; }
    }

    public class ExperienceTranslationSummary {
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class ExperienceView {
        public Guid? EId { get; set; }
        public bool EnabledInWeb { get; set; } 
        public ICollection<ExperienceTranslationView> Translations { get; set; }
    }

    public class ExperienceTranslationView {
        public Guid? EId { get; set; } 
        public TranslationView Language { get; set; }  
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class ExperienceTranslationOpen {    
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
