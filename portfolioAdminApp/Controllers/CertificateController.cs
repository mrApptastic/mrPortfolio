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
    [ApiController]
    [Authorize]
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
            var entity = await _context.PortfolioCertificates.Where(x => x.EId == id && x.Enabled).FirstOrDefaultAsync();

            if (entity == null) {
                throw new Exception("The requested entity could not be found in the database");
            }

            return Ok(MappingHelper.MapCertificateToViewModel(entity));
        }

        [HttpGet("new")]
        public ActionResult<CertificateView> New()
        {
            return Ok(MappingHelper.Map(new Certificate()));
        }

        [HttpPost]
        public async Task<ActionResult<CertificateView>> Post([FromBody]Certificate Certificate, [FromQuery]bool useForWeb = true)
        {
            try {
                Certificate.EId = Guid.NewGuid();
                Certificate.Enabled = true;
                Certificate.EnabledInWeb = useForWeb;

                _context.PortfolioCertificates.Add(Certificate);
                
                await _context.SaveChangesAsync();
                
                return Ok(MappingHelper.MapCertificateToViewModel(Certificate));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpPut]
        public async Task<ActionResult<CertificateView>> Put([FromBody]Certificate Certificate, [FromQuery]bool useForWeb = true)
        {
            try {
                var entity = _context.PortfolioCertificates.Where(x => x.EId == Certificate.EId && x.Enabled).FirstOrDefault();

                if (entity == null) {
                    throw new Exception("The requested entity could not be found in the database");
                }

                entity.EnabledInWeb = useForWeb;

                await _context.SaveChangesAsync();

                return Ok(MappingHelper.MapCertificateToViewModel(entity));
            } catch (Exception e) {
                throw e;            
            }    
        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            try {
                var entity = _context.PortfolioCertificates.Where(x => x.EId == id && x.Enabled).FirstOrDefault();

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
