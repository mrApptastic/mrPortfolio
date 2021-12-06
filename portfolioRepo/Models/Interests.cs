
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioRepo.Models
{
    public class Interest: InterestSummary
    {  
        [Key]
        public int Id { get; set; }  
        public bool Enabled { get; set; }
        public bool EnabledInWeb { get; set; } 
    }  

    public class InterestSummary
    {
        public Guid? EId { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<InterestTranslation> Translations { get; set; }
    }

    public class InterestTranslation : InterestTranslationSummary
    {
        [Key]
        public int Id { get; set; }
    }

    public class InterestTranslationSummary {
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class InterestView {
        public Guid? EId { get; set; }
        public bool EnabledInWeb { get; set; } 
        public string ImageUrl { get; set; }
        public ICollection<InterestTranslationView> Translations { get; set; }
    }

    public class InterestTranslationView {
        public Guid? EId { get; set; } 
        public TranslationView Language { get; set; }  
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class InterestTranslationOpen {    
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}
