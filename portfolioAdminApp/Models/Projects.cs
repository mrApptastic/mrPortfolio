
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace portfolioAdminApp.Models 
{
    public class Project : ProjectView
    {  
        [Key]
        public int Id { get; set; }  
        public bool Enabled { get; set; }
        public bool EnabledInWeb { get; set; } 
    }  

    public class ProjectView 
    {
        public Guid? EId { get; set; } 
        public ICollection<ProjectTranslation> Translations { get; set; }
    }

    public class ProjectTranslation 
    {
        [Key]
        public int Id { get; set; }
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class ProjectOpen {
        public ICollection<ProjectTranslationOpen> Translations { get; set; }
    }

    public class ProjectTranslationOpen {
        public TranslationOpen Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
