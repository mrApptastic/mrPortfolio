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

namespace portfolioAdminApp.Controllers
{
    [ApiController]
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
        public async Task<ActionResult<ICollection<ExperienceView>>> GetAll([FromQuery] string search)
        {
            var query = _context.PortfolioExperiences.Where(x => x.Enabled).OrderBy(x => x.EId).AsQueryable();

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
            var entity = await _context.PortfolioExperiences.Where(x => x.EId == id && x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapExperienceToViewModel(entity));
        }

        [HttpGet("new")]
        public ActionResult<ExperienceView> New()
        {
            return Ok(new ExperienceView());
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
                Experience.EId = Guid.NewGuid();
                Experience.Enabled = true;
                if (Experience.Translations == null) {
                    Experience.Translations = new List<ExperienceTranslation>();
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
                var entity = _context.PortfolioExperiences.Where(x => x.EId == Experience.EId && x.Enabled).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;

                await _context.SaveChangesAsync();

                return Ok(MappingHelper.MapExperienceToViewModel(entity));
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
