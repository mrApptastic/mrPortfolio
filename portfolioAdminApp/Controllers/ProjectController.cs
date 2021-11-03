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
    public class ProjectController : ControllerBase
    {

        private readonly ILogger<ProjectController> _logger;
        private readonly ApplicationDbContext _context;

        public ProjectController(ILogger<ProjectController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<ProjectView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
        {
            var query = _context.PortfolioProjects.Where(x => x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).OrderBy(x => x.EId).AsQueryable();

            if (search != null) {
                query = query.Where(x => x.Translations.Any(x => x.Name.ToLower().Contains(search.ToLower()))).AsQueryable();
            }

            var entities = await query.ToListAsync();

            var views = new List<ProjectView>();

            foreach (var entity in entities) {
                views.Add(MappingHelper.MapProjectToViewModel(entity));
            }

            return Ok(views);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ProjectView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            var entity = await _context.PortfolioProjects.Where(x => x.EId == id && x.Enabled && x.EnabledInWeb == useForWeb).Include(x => x.Translations).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapProjectToViewModel(entity));
        }

        [HttpGet("new")]
        public ActionResult<ProjectView> New()
        {
            return Ok(new ProjectView());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<ProjectTranslationView>> NewTranslation(string langCode)
        {
            var language = await _context.PortfolioTranslations.Where(x => x.LanguageCode.Contains(langCode.ToLower())).FirstOrDefaultAsync();

            if (language == null) {
                throw new Exception("Language with code " + langCode + " was not found!");
            }

            var trans = new ProjectTranslationView();
            
            trans.Language = language;
            
            return Ok(trans);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectView>> Post([FromBody]Project Project, [FromQuery]bool useForWeb = true)
        {
            try {
                Project.EId = Guid.NewGuid();
                Project.EnabledInWeb = useForWeb;
                Project.Enabled = true;
                if (Project.Translations == null) {
                    Project.Translations = new List<ProjectTranslation>();
                }                 

                _context.PortfolioProjects.Add(Project);
                
                await _context.SaveChangesAsync();
                
                return Ok(await GetById((Guid)Project.EId, useForWeb));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpPut]
        public async Task<ActionResult<ProjectView>> Put([FromBody]Project Project, [FromQuery]bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioProjects.Where(x => x.EId == Project.EId && x.Enabled).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;
                entity.From = Project.From;
                entity.To = Project.To;
                entity.ImageUrl = Project.ImageUrl;
                entity.DemoUrl = Project.DemoUrl;

                foreach (var trans in entity.Translations) {
                    var changes = Project.Translations.Where(x => x.Language.LanguageCode == trans.Language.LanguageCode).FirstOrDefault();
                    if (changes != null) {
                        trans.Name = changes.Name;
                        trans.Place = changes.Place;
                        trans.Description = changes.Description;
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(MappingHelper.MapProjectToViewModel(entity));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioProjects.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
