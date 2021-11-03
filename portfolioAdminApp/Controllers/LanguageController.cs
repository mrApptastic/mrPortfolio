using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using portfolioAdminApp.Data;
using portfolioAdminApp.Models;
using portfolioAdminApp.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace portfolioAdminApp.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class LanguageController : ControllerBase
    {

        private readonly ILogger<LanguageController> _logger;
        private readonly ApplicationDbContext _context;

        public LanguageController(ILogger<LanguageController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<LanguageView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
        {
            var query = _context.PortfolioLanguages.Where(x => x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).OrderBy(x => x.EId).AsQueryable();

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<LanguageView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapLanguageToViewModel(entity));
            }

            return Ok(views);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<LanguageView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            var entity = await _context.PortfolioLanguages.Where(x => x.EId == id && x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapLanguageToViewModel(entity));
        }

        [HttpGet("new")]
        public ActionResult<LanguageView> New()
        {
            return Ok(new LanguageView());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<LanguageTranslationView>> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new LanguageTranslationView();
            
            trans.Language = language;
            
            return Ok(trans);
        }

        [HttpPost]
        public async Task<ActionResult<LanguageView>> Post([FromBody]Language Language, [FromQuery]bool useForWeb = true)
        {
            try {
                Language.EId = Guid.NewGuid();
                Language.EnabledInWeb = useForWeb;
                Language.Enabled = true;
                if (Language.Translations == null) {
                    Language.Translations = new List<LanguageTranslation>();
                }                 

                _context.PortfolioLanguages.Add(Language);
                
                await _context.SaveChangesAsync();
                
                return Ok(await GetById((Guid)Language.EId, useForWeb));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpPut]
        public async Task<ActionResult<LanguageView>> Put([FromBody]Language Language, [FromQuery]bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioLanguages.Where(x => x.EId == Language.EId && x.Enabled).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }
                entity.EnabledInWeb = useForWeb;
                entity.ImageUrl = Language.ImageUrl;

                foreach (var trans in entity.Translations) {
                    var changes = Language.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(MappingHelper.MapLanguageToViewModel(entity));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioLanguages.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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