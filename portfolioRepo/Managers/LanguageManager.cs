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
	public interface ILanguageManager {
        Task<ICollection<LanguageView>> GetAll(string search, bool useForWeb = true);
        Task<LanguageView> GetById(Guid id, bool useForWeb = true);
        LanguageView New();
        Task<LanguageTranslationView> NewTranslation(string langCode);
        Task<LanguageView> Post(Language Language, bool useForWeb = true);
        Task<LanguageView> Put(Language Language, bool useForWeb = true);
        Task<bool> Delete(Guid id);
	}

    public class LanguageManager: ILanguageManager
    {
        private readonly ILogger<LanguageManager> _logger;
        private readonly ApplicationDbContext _context;
        
        public LanguageManager(ILogger<LanguageManager> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<ICollection<LanguageView>> GetAll(string search, bool useForWeb = true)
        {
            var query = _context.PortfolioLanguages.Where(x => x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).OrderBy(x => x.EId).AsQueryable();

            if (useForWeb) {
                query = query.Where(x => x.EnabledInWeb == true).AsQueryable();                
            }

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<LanguageView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapLanguageToViewModel(entity));
            }

            return views;
        }

        public async Task<LanguageView> GetById(Guid id, bool useForWeb = true)
        {
            var entity = await _context.PortfolioLanguages.Where(x => x.EId == id && x.Enabled && (useForWeb ? x.EnabledInWeb == true : true)).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return MappingHelper.MapLanguageToViewModel(entity);
        }
        public LanguageView New()
        {
            var language = new LanguageView();
            language.EId = new Guid();
            language.Translations = new List<LanguageTranslationView>();
            return language;
        }

        public async Task<LanguageTranslationView> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new LanguageTranslationView();
            
            trans.Language = language;
            
            return trans;
        }

        public async Task<LanguageView> Post(Language Language, bool useForWeb = true)
        {
            try {
                var languageList = await _context.PortfolioTranslations.ToListAsync();
                
                Language.EId = Guid.NewGuid();
                Language.EnabledInWeb = useForWeb;
                Language.Enabled = true;
                
                if (Language.Translations == null) {
                    Language.Translations = new List<LanguageTranslation>();
                }

                foreach (var trans in Language.Translations) {
                    trans.EId = Guid.NewGuid();
                    string langCode = trans.Language.LanguageCode;
                    trans.Language = languageList.Where(x => x.LanguageCode == langCode).FirstOrDefault();
                }        

                _context.PortfolioLanguages.Add(Language);
                
                await _context.SaveChangesAsync();
                
                return await GetById((Guid)Language.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<LanguageView> Put(Language Language, bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioLanguages.Where(x => x.EId == Language.EId && x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.ImageUrl = Language.ImageUrl;
                
                if (entity.Translations == null) {
                    entity.Translations = new List<LanguageTranslation>();
                }

                foreach (var trans in entity.Translations) {
                    var changes = Language.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return await GetById((Guid)Language.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<bool> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioLanguages.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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