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
	public interface IQualificationManager {
        Task<ICollection<QualificationView>> GetAll(string search, bool useForWeb = true);
        Task<QualificationView> GetById(Guid id, bool useForWeb = true);
        QualificationView New();
        Task<QualificationTranslationView> NewTranslation(string langCode);
        Task<QualificationView> Post(Qualification Qualification, bool useForWeb = true);
        Task<QualificationView> Put(Qualification Qualification, bool useForWeb = true);
        Task<bool> Delete(Guid id);
	}

    public class QualificationManager: IQualificationManager
    {
        private readonly ILogger<QualificationManager> _logger;
        private readonly ApplicationDbContext _context;
        
        public QualificationManager(ILogger<QualificationManager> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<ICollection<QualificationView>> GetAll(string search, bool useForWeb = true)
        {
            var query = _context.PortfolioQualifications.Where(x => x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).OrderBy(x => x.EId).AsQueryable();

            if (useForWeb) {
                query = query.Where(x => x.EnabledInWeb == true).AsQueryable();                
            }

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<QualificationView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapQualificationToViewModel(entity));
            }

            return views;
        }

        public async Task<QualificationView> GetById(Guid id, bool useForWeb = true)
        {
            var entity = await _context.PortfolioQualifications.Where(x => x.EId == id && x.Enabled && (useForWeb ? x.EnabledInWeb == true : true)).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return MappingHelper.MapQualificationToViewModel(entity);
        }
        public QualificationView New()
        {
            var qualification = new QualificationView();
            qualification.EId = new Guid();
            qualification.Translations = new List<QualificationTranslationView>();
            return qualification;
        }

        public async Task<QualificationTranslationView> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new QualificationTranslationView();
            
            trans.Language = language;
            
            return trans;
        }

        public async Task<QualificationView> Post(Qualification Qualification, bool useForWeb = true)
        {
            try {
                var languageList = await _context.PortfolioTranslations.ToListAsync();
                
                Qualification.EId = Guid.NewGuid();
                Qualification.EnabledInWeb = useForWeb;
                Qualification.Enabled = true;
                
                if (Qualification.Translations == null) {
                    Qualification.Translations = new List<QualificationTranslation>();
                }

                foreach (var trans in Qualification.Translations) {
                    trans.EId = Guid.NewGuid();
                    string langCode = trans.Language.LanguageCode;
                    trans.Language = languageList.Where(x => x.LanguageCode == langCode).FirstOrDefault();
                }        

                _context.PortfolioQualifications.Add(Qualification);
                
                await _context.SaveChangesAsync();
                
                return await GetById((Guid)Qualification.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<QualificationView> Put(Qualification Qualification, bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioQualifications.Where(x => x.EId == Qualification.EId && x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.ImageUrl = Qualification.ImageUrl;
                
                if (entity.Translations == null) {
                    entity.Translations = new List<QualificationTranslation>();
                }

                foreach (var trans in entity.Translations) {
                    var changes = Qualification.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return await GetById((Guid)Qualification.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<bool> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioQualifications.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
