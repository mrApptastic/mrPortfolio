
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Education : EducationView
   {  
       [Key]
       public int Id { get; set; }  
       public bool Enabled { get; set; }
       public bool EnabledInWeb { get; set; } 
   }  

public class EducationView 
    {
        public Guid? EId { get; set; } 
        public ICollection<EducationTranslation> Translations { get; set; }
    }

public class EducationTranslation 
    {
        [Key]
        public int Id { get; set; }
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

public class EducationOpen {
        public ICollection<EducationTranslationOpen> Translations { get; set; }
}

public class EducationTranslationOpen {
        public TranslationOpen Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
}