using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PortfolioRepo.Models;
using PortfolioRepo.Managers;
using PortfolioRepo.Data;

namespace portfolioAdminApp.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ExperienceController : ControllerBase
    {

        private readonly ILogger<ExperienceController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IExperienceManager _manager;

        public ExperienceController(ILogger<ExperienceController> logger, ApplicationDbContext context, IExperienceManager manager)
        {
            _logger = logger;
            _context = context;
            _manager = manager;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<ExperienceView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetAll(search, useForWeb));
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ExperienceView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetById(id, useForWeb));
        }

        [HttpGet("new")]
        public ActionResult<ExperienceView> New()
        {
            return Ok(_manager.New());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<ExperienceTranslationView>> NewTranslation(string langCode)
        {
            return Ok(await _manager.NewTranslation(langCode));
        }

        [HttpPost]
        public async Task<ActionResult<ExperienceView>> Post([FromBody]Experience Experience, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Post(Experience, useForWeb));
        }

        [HttpPut]
        public async Task<ActionResult<ExperienceView>> Put([FromBody]Experience Experience, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Put(Experience, useForWeb));  
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return Ok(await _manager.Delete(id));
        }
    }
}
