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
	public interface IExperienceManager {
        Task<ICollection<ExperienceView>> GetAll(string search, bool useForWeb = true);
        Task<ExperienceView> GetById(Guid id, bool useForWeb = true);
        ExperienceView New();
        Task<ExperienceTranslationView> NewTranslation(string langCode);
        Task<ExperienceView> Post(Experience Experience, bool useForWeb = true);
        Task<ExperienceView> Put(Experience Experience, bool useForWeb = true);
        Task<bool> Delete(Guid id);
	}

    public class ExperienceManager: IExperienceManager
    {
        private readonly ILogger<ExperienceManager> _logger;
        private readonly ApplicationDbContext _context;
        
        public ExperienceManager(ILogger<ExperienceManager> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<ICollection<ExperienceView>> GetAll(string search, bool useForWeb = true)
        {
            var query = _context.PortfolioExperiences.Where(x => x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).OrderBy(x => x.EId).AsQueryable();

            if (useForWeb) {
                query = query.Where(x => x.EnabledInWeb == true).AsQueryable();                
            }

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<ExperienceView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapExperienceToViewModel(entity));
            }

            return views;
        }

        public async Task<ExperienceView> GetById(Guid id, bool useForWeb = true)
        {
            var entity = await _context.PortfolioExperiences.Where(x => x.EId == id && x.Enabled && (useForWeb ? x.EnabledInWeb == true : true)).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return MappingHelper.MapExperienceToViewModel(entity);
        }
        public ExperienceView New()
        {
            var experience = new ExperienceView();
            experience.EId = new Guid();
            experience.Translations = new List<ExperienceTranslationView>();
            return experience;
        }

        public async Task<ExperienceTranslationView> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new ExperienceTranslationView();
            
            trans.Language = language;
            
            return trans;
        }

        public async Task<ExperienceView> Post(Experience Experience, bool useForWeb = true)
        {
            try {
                var languageList = await _context.PortfolioTranslations.ToListAsync();
                
                Experience.EId = Guid.NewGuid();
                Experience.EnabledInWeb = useForWeb;
                Experience.Enabled = true;
                
                if (Experience.Translations == null) {
                    Experience.Translations = new List<ExperienceTranslation>();
                }

                foreach (var trans in Experience.Translations) {
                    trans.EId = Guid.NewGuid();
                    string langCode = trans.Language.LanguageCode;
                    trans.Language = languageList.Where(x => x.LanguageCode == langCode).FirstOrDefault();
                }        

                _context.PortfolioExperiences.Add(Experience);
                
                await _context.SaveChangesAsync();
                
                return await GetById((Guid)Experience.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<ExperienceView> Put(Experience Experience, bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioExperiences.Where(x => x.EId == Experience.EId && x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.From = Experience.From;
                entity.To = Experience.To;
                entity.ImageUrl = Experience.ImageUrl;
                
                if (entity.Translations == null) {
                    entity.Translations = new List<ExperienceTranslation>();
                }

                foreach (var trans in entity.Translations) {
                    var changes = Experience.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Place = changes.Place;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return await GetById((Guid)Experience.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<bool> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioExperiences.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
