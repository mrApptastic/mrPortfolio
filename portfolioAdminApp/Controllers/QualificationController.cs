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
    public class QualificationController : ControllerBase
    {

        private readonly ILogger<QualificationController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IQualificationManager _manager;

        public QualificationController(ILogger<QualificationController> logger, ApplicationDbContext context, IQualificationManager manager)
        {
            _logger = logger;
            _context = context;
            _manager = manager;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<QualificationView>>> GetAll([FromQuery] string search, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetAll(search, useForWeb));
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<QualificationView>> GetById(Guid id, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.GetById(id, useForWeb));
        }

        [HttpGet("new")]
        public ActionResult<QualificationView> New()
        {
            return Ok(_manager.New());
        }

        [HttpGet("newTranslation/{langCode}")]
        public async Task<ActionResult<QualificationTranslationView>> NewTranslation(string langCode)
        {
            return Ok(await _manager.NewTranslation(langCode));
        }

        [HttpPost]
        public async Task<ActionResult<QualificationView>> Post([FromBody]Qualification Qualification, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Post(Qualification, useForWeb));
        }

        [HttpPut]
        public async Task<ActionResult<QualificationView>> Put([FromBody]Qualification Qualification, [FromQuery]bool useForWeb = true)
        {
            return Ok(await _manager.Put(Qualification, useForWeb));  
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            return Ok(await _manager.Delete(id));
        }
    }
}
