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
	public interface IEducationManager {
        Task<ICollection<EducationView>> GetAll(string search, bool useForWeb = true);
        Task<EducationView> GetById(Guid id, bool useForWeb = true);
        EducationView New();
        Task<EducationTranslationView> NewTranslation(string langCode);
        Task<EducationView> Post(Education Education, bool useForWeb = true);
        Task<EducationView> Put(Education Education, bool useForWeb = true);
        Task<bool> Delete(Guid id);
	}

    public class EducationManager: IEducationManager
    {
        private readonly ILogger<EducationManager> _logger;
        private readonly ApplicationDbContext _context;
        
        public EducationManager(ILogger<EducationManager> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<ICollection<EducationView>> GetAll(string search, bool useForWeb = true)
        {
            var query = _context.PortfolioEducations.Where(x => x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).OrderBy(x => x.EId).AsQueryable();

            if (useForWeb) {
                query = query.Where(x => x.EnabledInWeb == true).AsQueryable();                
            }

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<EducationView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapEducationToViewModel(entity));
            }

            return views;
        }

        public async Task<EducationView> GetById(Guid id, bool useForWeb = true)
        {
            var entity = await _context.PortfolioEducations.Where(x => x.EId == id && x.Enabled && (useForWeb ? x.EnabledInWeb == true : true)).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return MappingHelper.MapEducationToViewModel(entity);
        }
        public EducationView New()
        {
            var education = new EducationView();
            education.EId = new Guid();
            education.Translations = new List<EducationTranslationView>();
            return education;
        }

        public async Task<EducationTranslationView> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new EducationTranslationView();
            
            trans.Language = language;
            
            return trans;
        }

        public async Task<EducationView> Post(Education Education, bool useForWeb = true)
        {
            try {
                var languageList = await _context.PortfolioTranslations.ToListAsync();
                
                Education.EId = Guid.NewGuid();
                Education.EnabledInWeb = useForWeb;
                Education.Enabled = true;
                
                if (Education.Translations == null) {
                    Education.Translations = new List<EducationTranslation>();
                }

                foreach (var trans in Education.Translations) {
                    trans.EId = Guid.NewGuid();
                    string langCode = trans.Language.LanguageCode;
                    trans.Language = languageList.Where(x => x.LanguageCode == langCode).FirstOrDefault();
                }        

                _context.PortfolioEducations.Add(Education);
                
                await _context.SaveChangesAsync();
                
                return await GetById((Guid)Education.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<EducationView> Put(Education Education, bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioEducations.Where(x => x.EId == Education.EId && x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.From = Education.From;
                entity.To = Education.To;
                entity.ImageUrl = Education.ImageUrl;

                if (entity.Translations == null) {
                    entity.Translations = new List<EducationTranslation>();
                }

                foreach (var trans in entity.Translations) {
                    var changes = Education.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Place = changes.Place;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return await GetById((Guid)Education.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<bool> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioEducations.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
