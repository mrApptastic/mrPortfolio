using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using portfolioAdminApp.Data;
using portfolioAdminApp.Models;

namespace portfolioAdminApp.Controllers
{
    [Route("api/[controller]")]
    public class PortFolioController : ControllerBase
    {

        private readonly ILogger<PortFolioController> _logger;
        private readonly ApplicationDbContext _context;

        public PortFolioController(ILogger<PortFolioController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("Quals")]
        public async Task<ActionResult<ICollection<Translation>>> GetQuals()
        {
            var uha = await _context.PortfolioQualifications
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            // .Include(x => x.)
                            // .Include(x => x.Language)
                            // .Include(x => x.Qualification).ThenInclude(x => x)
                            .ToListAsync();
            return Ok(uha);
        }   
    }
}
