
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace portfolioAdminApp.Models
{
    public class Language: LanguageSummary
    {  
        [Key]
        public int Id { get; set; }  
        public bool Enabled { get; set; }
        public bool EnabledInWeb { get; set; } 
    }  

    public class LanguageSummary
    {
        public Guid? EId { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<LanguageTranslation> Translations { get; set; }
    }

    public class LanguageTranslation : LanguageTranslationSummary
    {
        [Key]
        public int Id { get; set; }
    }

    public class LanguageTranslationSummary {
        public Guid? EId { get; set; }
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class LanguageView {
        public Guid? EId { get; set; }
        public bool EnabledInWeb { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<LanguageTranslationView> Translations { get; set; }
    }

    public class LanguageTranslationView {
        public Guid? EId { get; set; } 
        public TranslationView Language { get; set; }  
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class LanguageTranslationOpen {    
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}
