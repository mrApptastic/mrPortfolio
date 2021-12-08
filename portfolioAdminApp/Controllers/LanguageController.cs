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
    public class LanguageController : ControllerBase
    {

        private readonly ILogger<LanguageController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly ILanguageManager _manager;

        public LanguageController(ILogger<LanguageController> logger, ApplicationDbContext context, ILanguageManager manager)
        {
            _logger = logger;
            _context = context;
            _manager = manager;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<LanguageView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetAll(search, useForWeb));
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<LanguageView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetById(id, useForWeb));
        }

        [HttpGet("new")]
        public ActionResult<LanguageView> New()
        {
            return Ok(_manager.New());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<LanguageTranslationView>> NewTranslation(string langCode)
        {
            return Ok(await _manager.NewTranslation(langCode));
        }

        [HttpPost]
        public async Task<ActionResult<LanguageView>> Post([FromBody]Language Language, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Post(Language, useForWeb));
        }

        [HttpPut]
        public async Task<ActionResult<LanguageView>> Put([FromBody]Language Language, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Put(Language, useForWeb));  
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return Ok(await _manager.Delete(id));
        }
    }
}
