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

        [HttpGet("Certificates")]
        public async Task<ActionResult<ICollection<CertificateOpen>>> GetCertificates()
        {
            return Ok(await GetCertificateList());
        }   

        [HttpGet("Quals")]
        public async Task<ActionResult<ICollection<QualificationView>>> GetQuals()
        {
            var qualifications = await _context.PortfolioQualifications
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            // .Include(x => x.)
                            // .Include(x => x.Language)
                            // .Include(x => x.Qualification).ThenInclude(x => x)
                            .ToListAsync();
            return Ok(qualifications);
        }   

        private async Task<ICollection<CertificateOpen>> GetCertificateList()
        {
            var certificates = await _context.PortfolioCertificates.Where(x => x.Enabled && x.EnabledInWeb)
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            .ToListAsync();

            var certificateList = new List<CertificateOpen>();

            foreach (var certificate in certificates) {
                if (certificate.Translations != null && certificate.Translations.Count() > 0) {
                    var ib = MappingHelper.MapCertificateToOpenModel(certificate);
                    certificateList.Add(ib);
                }                 
             }

            return certificateList;
        } 
    } 
}
