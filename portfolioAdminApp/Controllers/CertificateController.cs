using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using portfolioAdminApp.Data;
using portfolioAdminApp.Models;
using portfolioAdminApp.Helpers;

namespace portfolioAdminApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificateController : ControllerBase
    {

        private readonly ILogger<CertificateController> _logger;
        private readonly ApplicationDbContext _context;

        public CertificateController(ILogger<CertificateController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<CertificateView>>> GetAll([FromQuery] string search)
        {
            var query = _context.PortfolioCertificates.Where(x => x.Enabled).OrderBy(x => x.EId).AsQueryable();

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<CertificateView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapCertificateToViewModel(entity));
            }

            return Ok(views);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<CertificateView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            var entity = await _context.PortfolioCertificates.Where(x => x.EId == id && x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapCertificateToViewModel(entity));
        }

        [HttpGet("new")]
        public ActionResult<CertificateView> New()
        {
            return Ok(new CertificateView());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<CertificateTranslationView>> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new CertificateTranslationView();
            
            trans.Language = language;
            
            return Ok(trans);
        }

        [HttpPost]
        public async Task<ActionResult<CertificateView>> Post([FromBody]Certificate Certificate, [FromQuery]bool useForWeb = true)
        {
            try {
                Certificate.EId = Guid.NewGuid();
                Certificate.Enabled = true;
                if (Certificate.Translations == null) {
                    Certificate.Translations = new List<CertificateTranslation>();
                }                 

                _context.PortfolioCertificates.Add(Certificate);
                
                await _context.SaveChangesAsync();
                
                return Ok(await GetById((Guid)Certificate.EId, useForWeb));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpPut]
        public async Task<ActionResult<CertificateView>> Put([FromBody]Certificate Certificate, [FromQuery]bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioCertificates.Where(x => x.EId == Certificate.EId && x.Enabled).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.From = Certificate.From;
                entity.To = Certificate.To;
                entity.ImageUrl = Certificate.ImageUrl;

                foreach (var trans in entity.Translations) {
                    var changes = Certificate.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Place = changes.Place;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(MappingHelper.MapCertificateToViewModel(entity));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioCertificates.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.Enabled = false;

                await _context.SaveChangesAsync();

                return Ok(true);
            } catch (Exception e) {
                throw e;            
            } 
        }
    }
}
