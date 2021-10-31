
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace portfolioAdminApp.Models
{
    public class Project: ProjectSummary
    {  
        [Key]
        public int Id { get; set; }  
        public bool Enabled { get; set; }
        public bool EnabledInWeb { get; set; } 
    }  

    public class ProjectSummary
    {
        public Guid? EId { get; set; } 
        public ICollection<ProjectTranslation> Translations { get; set; }
    }

    public class ProjectTranslation : ProjectTranslationSummary
    {
        [Key]
        public int Id { get; set; }
    }

    public class ProjectTranslationSummary {
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class ProjectView {
        public Guid? EId { get; set; }
        public bool EnabledInWeb { get; set; } 
        public ICollection<ProjectTranslationView> Translations { get; set; }
    }

    public class ProjectTranslationView {
        public Guid? EId { get; set; } 
        public TranslationView Language { get; set; }  
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class ProjectTranslationOpen {    
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
