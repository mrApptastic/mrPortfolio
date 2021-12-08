using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PortfolioRepo.Data;
using PortfolioRepo.Models;
using PortfolioRepo.Managers;

namespace portfolioAdminApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortFolioController : ControllerBase
    {

        private readonly ILogger<PortFolioController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IPortfolioManager _manager;
        
        public PortFolioController(ILogger<PortFolioController> logger, ApplicationDbContext context, IPortfolioManager manager)
        {
            _logger = logger;
            _context = context;
            _manager = manager;
        }

        [HttpGet("GetAll/{langCode}")]
        public async Task<ActionResult<PortfolioOpen>> GetAll(string langCode)
        {
            return Ok(await _manager.GetAll(langCode));
        }   
    }
}
