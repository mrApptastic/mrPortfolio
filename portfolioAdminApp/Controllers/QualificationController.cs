using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using portfolioAdminApp.Data;
using PortfolioRepo.Models;
using PortfolioRepo.Helpers;

namespace portfolioAdminApp.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class QualificationController : ControllerBase
    {

        private readonly ILogger<QualificationController> _logger;
        private readonly ApplicationDbContext _context;

        public QualificationController(ILogger<QualificationController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<QualificationView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
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

            return Ok(views);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<QualificationView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            var entity = await _context.PortfolioQualifications.Where(x => x.EId == id && x.Enabled && (useForWeb ? x.EnabledInWeb == true : true)).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapQualificationToViewModel(entity));
        }

        [HttpGet("new")]
        public ActionResult<QualificationView> New()
        {
            var qualification = new QualificationView();
            qualification.EId = new Guid();
            qualification.Translations = new List<QualificationTranslationView>();
            return Ok(qualification);
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<QualificationTranslationView>> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new QualificationTranslationView();
            
            trans.Language = language;
            
            return Ok(trans);
        }

        [HttpPost]
        public async Task<ActionResult<QualificationView>> Post([FromBody]Qualification Qualification, [FromQuery]bool useForWeb = true)
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
                
                return Ok(await GetById((Guid)Qualification.EId, useForWeb));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpPut]
        public async Task<ActionResult<QualificationView>> Put([FromBody]Qualification Qualification, [FromQuery]bool useForWeb = true)
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

                return Ok(await GetById((Guid)Qualification.EId, useForWeb));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioQualifications.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
