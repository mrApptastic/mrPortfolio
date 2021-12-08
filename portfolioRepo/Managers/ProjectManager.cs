using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using PortfolioRepo.Data;
using PortfolioRepo.Models;
using PortfolioRepo.Helpers;
using System;

namespace PortfolioRepo.Managers
{
	public interface IProjectManager {
        Task<ICollection<ProjectView>> GetAll(string search, bool useForWeb = true);
        Task<ProjectView> GetById(Guid id, bool useForWeb = true);
        ProjectView New();
        Task<ProjectTranslationView> NewTranslation(string langCode);
        Task<ProjectView> Post(Project Project, bool useForWeb = true);
        Task<ProjectView> Put(Project Project, bool useForWeb = true);
        Task<bool> Delete(Guid id);
	}

    public class ProjectManager: IProjectManager
    {
        private readonly ILogger<ProjectManager> _logger;
        private readonly ApplicationDbContext _context;
        
        public ProjectManager(ILogger<ProjectManager> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<ICollection<ProjectView>> GetAll(string search, bool useForWeb = true)
        {
            var query = _context.PortfolioProjects.Where(x => x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).OrderBy(x => x.EId).AsQueryable();

            if (useForWeb) {
                query = query.Where(x => x.EnabledInWeb == true).AsQueryable();                
            }

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<ProjectView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapProjectToViewModel(entity));
            }

            return views;
        }

        public async Task<ProjectView> GetById(Guid id, bool useForWeb = true)
        {
            var entity = await _context.PortfolioProjects.Where(x => x.EId == id && x.Enabled && (useForWeb ? x.EnabledInWeb == true : true)).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return MappingHelper.MapProjectToViewModel(entity);
        }
        public ProjectView New()
        {
            var project = new ProjectView();
            project.EId = new Guid();
            project.Translations = new List<ProjectTranslationView>();
            return project;
        }

        public async Task<ProjectTranslationView> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new ProjectTranslationView();
            
            trans.Language = language;
            
            return trans;
        }

        public async Task<ProjectView> Post(Project Project, bool useForWeb = true)
        {
            try {
                var languageList = await _context.PortfolioTranslations.ToListAsync();
                
                Project.EId = Guid.NewGuid();
                Project.EnabledInWeb = useForWeb;
                Project.Enabled = true;
                
                if (Project.Translations == null) {
                    Project.Translations = new List<ProjectTranslation>();
                }

                foreach (var trans in Project.Translations) {
                    trans.EId = Guid.NewGuid();
                    string langCode = trans.Language.LanguageCode;
                    trans.Language = languageList.Where(x => x.LanguageCode == langCode).FirstOrDefault();
                }        

                _context.PortfolioProjects.Add(Project);
                
                await _context.SaveChangesAsync();
                
                return await GetById((Guid)Project.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<ProjectView> Put(Project Project, bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioProjects.Where(x => x.EId == Project.EId && x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.From = Project.From;
                entity.To = Project.To;
                entity.ImageUrl = Project.ImageUrl;
                entity.DemoUrl = Project.DemoUrl;
                entity.DocUrl = Project.DocUrl;
                entity.SourceUrl = Project.SourceUrl;
                
                if (entity.Translations == null) {
                    entity.Translations = new List<ProjectTranslation>();
                }

                foreach (var trans in entity.Translations) {
                    var changes = Project.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Place = changes.Place;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return await GetById((Guid)Project.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<bool> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioProjects.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.Enabled = false;

                await _context.SaveChangesAsync();

                return true;
            } catch (Exception e) {
                throw e;            
            } 
        }
    }
}
