
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Qualification : QualificationView
   {  
       [Key]
       public int Id { get; set; }  
       public bool Enabled { get; set; }
       public bool EnabledInWeb { get; set; } 
   }  

public class QualificationView 
    {
        public Guid? EId { get; set; } 
    }

public class QualificationTranslation 
    {
        [Key]
        public int Id { get; set; }
        public Guid? EId { get; set; } 
        public Translation Language { get; set; }
        public Qualification Qualification { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }