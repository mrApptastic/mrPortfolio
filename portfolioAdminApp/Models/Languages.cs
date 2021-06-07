
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Language : LanguageView
   {  
       [Key]
       public int Id { get; set; }  
       public bool Enabled { get; set; }
       public bool EnabledInWeb { get; set; } 
   }  

public class LanguageView 
    {
        public Guid? EId { get; set; } 
        public ICollection<LanguageTranslation> Translations { get; set; }
    }

public class LanguageTranslation 
    {
        [Key]
        public int Id { get; set; }
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

public class LanguageOpen {
        public ICollection<LanguageTranslationOpen> Translations { get; set; }
}

public class LanguageTranslationOpen {
        public TranslationOpen Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
}