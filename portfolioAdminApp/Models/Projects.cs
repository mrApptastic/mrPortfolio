
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
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }         
        public string ImageUrl { get; set; }
        public string DemoUrl { get; set; }        
        public string DocUrl { get; set; }        
        public string SourceUrl { get; set; }
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
        public string Place { get; set; }
        public string Description { get; set; }
    }

    public class ProjectView {
        public Guid? EId { get; set; }
        public bool EnabledInWeb { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }         
        public string ImageUrl { get; set; }
        public string DemoUrl { get; set; }
        public string DocUrl { get; set; }        
        public string SourceUrl { get; set; }
        public ICollection<ProjectTranslationView> Translations { get; set; }
    }

    public class ProjectTranslationView {
        public Guid? EId { get; set; } 
        public TranslationView Language { get; set; }  
        public string Name { get; set; }
        public string Place { get; set; }
        public string Description { get; set; }
    }

    public class ProjectTranslationOpen {    
        public string Name { get; set; }
        public string Place { get; set; }
        public string Description { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }         
        public string ImageUrl { get; set; }
        public string DemoUrl { get; set; }
        public string DocUrl { get; set; }        
        public string SourceUrl { get; set; }
    }
}
