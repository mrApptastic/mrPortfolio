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
	public interface ICertificateManager {
        Task<ICollection<CertificateView>> GetAll(string search, bool useForWeb = true);
        Task<CertificateView> GetById(Guid id, bool useForWeb = true);
        CertificateView New();
        Task<CertificateTranslationView> NewTranslation(string langCode);
        Task<CertificateView> Post(Certificate Certificate, bool useForWeb = true);
        Task<CertificateView> Put(Certificate Certificate, bool useForWeb = true);
        Task<bool> Delete(Guid id);
	}

    public class CertificateManager: ICertificateManager
    {
        private readonly ILogger<CertificateManager> _logger;
        private readonly ApplicationDbContext _context;
        
        public CertificateManager(ILogger<CertificateManager> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<ICollection<CertificateView>> GetAll(string search, bool useForWeb = true)
        {
            var query = _context.PortfolioCertificates.Where(x => x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).OrderBy(x => x.EId).AsQueryable();

            if (useForWeb) {
                query = query.Where(x => x.EnabledInWeb == true).AsQueryable();                
            }

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<CertificateView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapCertificateToViewModel(entity));
            }

            return views;
        }

        public async Task<CertificateView> GetById(Guid id, bool useForWeb = true)
        {
            var entity = await _context.PortfolioCertificates.Where(x => x.EId == id && x.Enabled && (useForWeb ? x.EnabledInWeb == true : true)).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return MappingHelper.MapCertificateToViewModel(entity);
        }
        public CertificateView New()
        {
            var certificate = new CertificateView();
            certificate.EId = new Guid();
            certificate.Translations = new List<CertificateTranslationView>();
            return certificate;
        }

        public async Task<CertificateTranslationView> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new CertificateTranslationView();
            
            trans.Language = language;
            
            return trans;
        }

        public async Task<CertificateView> Post(Certificate Certificate, bool useForWeb = true)
        {
            try {
                var languageList = await _context.PortfolioTranslations.ToListAsync();
                
                Certificate.EId = Guid.NewGuid();
                Certificate.EnabledInWeb = useForWeb;
                Certificate.Enabled = true;
                
                if (Certificate.Translations == null) {
                    Certificate.Translations = new List<CertificateTranslation>();
                }

                foreach (var trans in Certificate.Translations) {
                    trans.EId = Guid.NewGuid();
                    string langCode = trans.Language.LanguageCode;
                    trans.Language = languageList.Where(x => x.LanguageCode == langCode).FirstOrDefault();
                }        

                _context.PortfolioCertificates.Add(Certificate);
                
                await _context.SaveChangesAsync();
                
                return await GetById((Guid)Certificate.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<CertificateView> Put(Certificate Certificate, bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioCertificates.Where(x => x.EId == Certificate.EId && x.Enabled).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.From = Certificate.From;
                entity.To = Certificate.To;
                entity.ImageUrl = Certificate.ImageUrl;

                if (entity.Translations == null) {
                    entity.Translations = new List<CertificateTranslation>();
                }

                foreach (var trans in entity.Translations) {
                    var changes = Certificate.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Place = changes.Place;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return await GetById((Guid)Certificate.EId, useForWeb);
            } catch (Exception e) {
                throw e;            
            }    
        }

        public async Task<bool> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioCertificates.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
