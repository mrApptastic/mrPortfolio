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
    public class EducationController : ControllerBase
    {

        private readonly ILogger<EducationController> _logger;
        private readonly ApplicationDbContext _context;

        public EducationController(ILogger<EducationController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<EducationView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
        {
            var query = _context.PortfolioEducations.Where(x => x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).OrderBy(x => x.EId).AsQueryable();

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<EducationView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapEducationToViewModel(entity));
            }

            return Ok(views);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<EducationView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            var entity = await _context.PortfolioEducations.Where(x => x.EId == id && x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapEducationToViewModel(entity));
        }

        [HttpGet("new")]
        public ActionResult<EducationView> New()
        {
            return Ok(new EducationView());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<EducationTranslationView>> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new EducationTranslationView();
            
            trans.Language = language;
            
            return Ok(trans);
        }

        [HttpPost]
        public async Task<ActionResult<EducationView>> Post([FromBody]Education Education, [FromQuery]bool useForWeb = true)
        {
            try {
                Education.EId = Guid.NewGuid();
                Education.EnabledInWeb = useForWeb;
                Education.Enabled = true;
                if (Education.Translations == null) {
                    Education.Translations = new List<EducationTranslation>();
                }                 

                _context.PortfolioEducations.Add(Education);
                
                await _context.SaveChangesAsync();
                
                return Ok(await GetById((Guid)Education.EId, useForWeb));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpPut]
        public async Task<ActionResult<EducationView>> Put([FromBody]Education Education, [FromQuery]bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioEducations.Where(x => x.EId == Education.EId && x.Enabled).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.From = Education.From;
                entity.To = Education.To;
                entity.ImageUrl = Education.ImageUrl;

                foreach (var trans in entity.Translations) {
                    var changes = Education.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Place = changes.Place;
                        trans.Description = changes.Description;

                    }
                }

                await _context.SaveChangesAsync();

                return Ok(MappingHelper.MapEducationToViewModel(entity));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioEducations.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
