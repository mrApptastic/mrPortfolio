
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Interest : InterestView
   {  
       [Key]
       public int Id { get; set; }  
       public bool Enabled { get; set; }
       public bool EnabledInWeb { get; set; } 
   }  

public class InterestView 
    {
        public Guid? EId { get; set; } 
        public ICollection<InterestTranslation> Translations { get; set; }
    }

public class InterestTranslation 
    {
        [Key]
        public int Id { get; set; }
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

public class InterestOpen {
        public ICollection<InterestTranslationOpen> Translations { get; set; }
}

public class InterestTranslationOpen {
        public TranslationOpen Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
}