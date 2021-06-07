
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Experience : ExperienceView
   {  
       [Key]
       public int Id { get; set; }  
       public bool Enabled { get; set; }
       public bool EnabledInWeb { get; set; } 
   }  

public class ExperienceView 
    {
        public Guid? EId { get; set; } 
        public ICollection<EducationTranslation> Translations { get; set; }
    }

public class ExperienceTranslation 
    {
        [Key]
        public int Id { get; set; }
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

public class ExperienceOpen {
        public ICollection<ExperienceTranslationOpen> Translations { get; set; }
}

public class ExperienceTranslationOpen {
        public TranslationOpen Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
}