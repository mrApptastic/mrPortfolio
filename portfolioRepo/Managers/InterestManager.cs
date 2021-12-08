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
	public interface IInterestManager {
        Task<ICollection<InterestView>> GetAll(string search, bool useForWeb = true);
        Task<InterestView> GetById(Guid id, bool useForWeb = true);
        InterestView New();
        Task<InterestTranslationView> NewTranslation(string langCode);
        Task<InterestView> Post(Interest Interest, bool useForWeb = true);
        Task<InterestView> Put(Interest Interest, bool useForWeb = true);
        Task<bool> Delete(Guid id);
	}

    public class InterestManager: IInterestManager
    {
        private readonly ILogger<InterestManager> _logger;
        private readonly ApplicationDbContext _context;
        
        public InterestManager(ILogger<InterestManager> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<ICollection<InterestView>> GetAll(string search, bool useForWeb = true)
        {
            var query = _context.PortfolioInterests.Where(x => x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).OrderBy(x => x.EId).AsQueryable();

            if (useForWeb) {
                query = query.Where(x => x.EnabledInWeb == true).AsQueryable();                
            }

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<InterestView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapInterestToViewModel(entity));
            }

            return views;
        }

        public async Task<InterestView> GetById(Guid id, bool useForWeb = true)
        {
            var entity = await _context.PortfolioInterests.Where(x => x.EId == id && x.Enabled && (useForWeb ? x.EnabledInWeb == true : true)).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return MappingHelper.MapInterestToViewModel(entity);
        }
        public InterestView New()
        {
            var interest = new InterestView();
            interest.EId = new Guid();
            interest.Translations = new List<InterestTranslationView>();
            return interest;
        }

        public async Task<InterestTranslationView> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new InterestTranslationView();
            
            trans.Language = language;
            
            return trans;
        }

        public async Task<InterestView> Post(Interest Interest, bool useForWeb = true)
        {
            try {
                var languageList = await _context.PortfolioTranslations.ToListAsync();
                
                Interest.EId = Guid.NewGuid();
                Interest.EnabledInWeb = useForWeb;
                Interest.Enabled = true;
                
                if (Interest.Translations == null) {
                    Interest.Translations = new List<InterestTranslation>();
                }

                foreach (var trans in Interest.Translations) {
                    trans.EId = Guid.NewGuid();
                    string langCode = trans.Language.LanguageCode;
                    trans.Language = languageList.Where(x => x.LanguageCode == langCode).FirstOrDefault();
                }        

                _context.PortfolioInterests.Add(Interest);
                
                await _context.SaveChangesAsync();
                
                return await GetById((Guid)Interest.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<InterestView> Put(Interest Interest, bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioInterests.Where(x => x.EId == Interest.EId && x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.ImageUrl = Interest.ImageUrl;
                
                if (entity.Translations == null) {
                    entity.Translations = new List<InterestTranslation>();
                }

                foreach (var trans in entity.Translations) {
                    var changes = Interest.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return await GetById((Guid)Interest.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<bool> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioInterests.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
