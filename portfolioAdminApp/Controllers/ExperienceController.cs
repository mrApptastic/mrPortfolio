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
    public class ExperienceController : ControllerBase
    {

        private readonly ILogger<ExperienceController> _logger;
        private readonly ApplicationDbContext _context;

        public ExperienceController(ILogger<ExperienceController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<ExperienceView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
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

            return Ok(views);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ExperienceView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            var entity = await _context.PortfolioExperiences.Where(x => x.EId == id && x.Enabled && (useForWeb ? x.EnabledInWeb == true : true)).Include(x => x.Translations).ThenInclude(x => x.Language).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapExperienceToViewModel(entity));
        }

        [HttpGet("new")]
        public ActionResult<ExperienceView> New()
        {
            var experience = new ExperienceView();
            experience.EId = new Guid();
            experience.Translations = new List<ExperienceTranslationView>();
            return Ok(experience);
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<ExperienceTranslationView>> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new ExperienceTranslationView();
            
            trans.Language = language;
            
            return Ok(trans);
        }

        [HttpPost]
        public async Task<ActionResult<ExperienceView>> Post([FromBody]Experience Experience, [FromQuery]bool useForWeb = true)
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
                
                return Ok(await GetById((Guid)Experience.EId, useForWeb));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpPut]
        public async Task<ActionResult<ExperienceView>> Put([FromBody]Experience Experience, [FromQuery]bool useForWeb = true)
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

                return Ok(await GetById((Guid)Experience.EId, useForWeb));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioExperiences.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
