using System;
using System.ComponentModel.DataAnnotations;

namespace PortfolioRepo.Models 
{
    public class Translation : TranslationView
    {  
        [Key]
        public int Id { get; set; }  
        public bool Enabled { get; set; }
        public bool EnabledInWeb { get; set; } 
    }  

    public class TranslationView 
    {
        public Guid? EId { get; set; }
        public string LanguageCode { get; set; }
        public string Name { get; set; }
    }

    public class TranslationOpen 
    {
        public string Name { get; set; }
    }
}
