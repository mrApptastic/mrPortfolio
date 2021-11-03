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
    public class InterestController : ControllerBase
    {

        private readonly ILogger<InterestController> _logger;
        private readonly ApplicationDbContext _context;

        public InterestController(ILogger<InterestController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<InterestView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
        {
            var query = _context.PortfolioInterests.Where(x => x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).OrderBy(x => x.EId).AsQueryable();

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<InterestView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapInterestToViewModel(entity));
            }

            return Ok(views);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<InterestView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            var entity = await _context.PortfolioInterests.Where(x => x.EId == id && x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapInterestToViewModel(entity));
        }

        [HttpGet("new")]
        public ActionResult<InterestView> New()
        {
            return Ok(new InterestView());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<InterestTranslationView>> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new InterestTranslationView();
            
            trans.Language = language;
            
            return Ok(trans);
        }

        [HttpPost]
        public async Task<ActionResult<InterestView>> Post([FromBody]Interest Interest, [FromQuery]bool useForWeb = true)
        {
            try {
                Interest.EId = Guid.NewGuid();
                Interest.EnabledInWeb = useForWeb;
                Interest.Enabled = true;
                if (Interest.Translations == null) {
                    Interest.Translations = new List<InterestTranslation>();
                }                 

                _context.PortfolioInterests.Add(Interest);
                
                await _context.SaveChangesAsync();
                
                return Ok(await GetById((Guid)Interest.EId, useForWeb));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpPut]
        public async Task<ActionResult<InterestView>> Put([FromBody]Interest Interest, [FromQuery]bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioInterests.Where(x => x.EId == Interest.EId && x.Enabled).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.ImageUrl = Interest.ImageUrl;

                foreach (var trans in entity.Translations) {
                    var changes = Interest.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(MappingHelper.MapInterestToViewModel(entity));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioInterests.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
