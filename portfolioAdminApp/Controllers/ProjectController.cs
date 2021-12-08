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
    public class ProjectController : ControllerBase
    {

        private readonly ILogger<ProjectController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IProjectManager _manager;

        public ProjectController(ILogger<ProjectController> logger, ApplicationDbContext context, IProjectManager manager)
        {
            _logger = logger;
            _context = context;
            _manager = manager;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<ProjectView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetAll(search, useForWeb));
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<ProjectView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetById(id, useForWeb));
        }

        [HttpGet("new")]
        public ActionResult<ProjectView> New()
        {
            return Ok(_manager.New());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<ProjectTranslationView>> NewTranslation(string langCode)
        {
            return Ok(await _manager.NewTranslation(langCode));
        }

        [HttpPost]
        public async Task<ActionResult<ProjectView>> Post([FromBody]Project Project, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Post(Project, useForWeb));
        }

        [HttpPut]
        public async Task<ActionResult<ProjectView>> Put([FromBody]Project Project, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Put(Project, useForWeb));  
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return Ok(await _manager.Delete(id));
        }
    }
}
