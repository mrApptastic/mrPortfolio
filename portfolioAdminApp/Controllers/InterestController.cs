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
    public class InterestController : ControllerBase
    {

        private readonly ILogger<InterestController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IInterestManager _manager;

        public InterestController(ILogger<InterestController> logger, ApplicationDbContext context, IInterestManager manager)
        {
            _logger = logger;
            _context = context;
            _manager = manager;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<InterestView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetAll(search, useForWeb));
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<InterestView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetById(id, useForWeb));
        }

        [HttpGet("new")]
        public ActionResult<InterestView> New()
        {
            return Ok(_manager.New());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<InterestTranslationView>> NewTranslation(string langCode)
        {
            return Ok(await _manager.NewTranslation(langCode));
        }

        [HttpPost]
        public async Task<ActionResult<InterestView>> Post([FromBody]Interest Interest, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Post(Interest, useForWeb));
        }

        [HttpPut]
        public async Task<ActionResult<InterestView>> Put([FromBody]Interest Interest, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Put(Interest, useForWeb));  
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return Ok(await _manager.Delete(id));
        }
    }
}
