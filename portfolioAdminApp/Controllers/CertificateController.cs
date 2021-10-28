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
using portfolioAdminApp.Helpers;

namespace portfolioAdminApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificateController : ControllerBase
    {

        private readonly ILogger<CertificateController> _logger;
        private readonly ApplicationDbContext _context;

        public CertificateController(ILogger<CertificateController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<CertificateView>>> GetAll([FromQuery] string search)
        {
            var query = _context.PortfolioCertificates.Where(x => x.Enabled).OrderBy(x => x.EId).AsQueryable();

            // if (search != null) {
            //     query = query.Where(x => x.Translations.Any(x => x.Name().Contains(search)).AsQueryable();
            // }

            var entities = await query.ToListAsync();

            var views = new List<CertificateView>();

            foreach (var entity in entities) {
   
            }

            return Ok(views);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<CertificateView>> GetById(Guid id)
        {
            var entity = await _context.PortfolioCertificates.Where(x => x.EId == id && x.Enabled).Include(x => x.Translations).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapCertificateToViewModel(entity));
        }

    }
}
