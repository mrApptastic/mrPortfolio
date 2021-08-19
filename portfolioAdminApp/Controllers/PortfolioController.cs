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

        [HttpGet("GetAll/{langCode}")]
        public async Task<ActionResult<PortfolioOpen>> GetAll(string langCode)
        {
            return Ok(new PortfolioOpen() {
                Certificates = await GetCertificateList(langCode),
                Educations = await GetEducationList(langCode),
                Experiences = await GetExperienceList(langCode),
                Interests = await GetInterestList(langCode),
                Languages = await GetLanguageList(langCode),
                Projects = await GetProjectList(langCode),
                Qualifications = await GetQualificationList(langCode)
            });
        }   

        private async Task<ICollection<CertificateTranslationOpen>> GetCertificateList(string langCode)
        {
            var certificates = await _context.PortfolioCertificates.Where(x => x.Enabled && x.EnabledInWeb)
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            .ToListAsync();

            var certificateList = new List<CertificateTranslationOpen>();

            foreach (var certificate in certificates) {
                if (certificate.Translations == null) {
                    continue;
                }

                var trans = certificate.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == langCode.ToLower()).FirstOrDefault();

                if (trans == null) {
                    trans = certificate.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == "en").FirstOrDefault();
                }

                if (trans != null) {
                    certificateList.Add(MappingHelper.MapCertificateTranslationToOpenModel(trans));
                }                
             }

            return certificateList;
        } 

        private async Task<ICollection<EducationTranslationOpen>> GetEducationList(string langCode)
        {
            var educations = await _context.PortfolioEducations.Where(x => x.Enabled && x.EnabledInWeb)
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            .ToListAsync();

            var educationList = new List<EducationTranslationOpen>();

            foreach (var education in educations) {
                if (education.Translations == null) {
                    continue;
                }

                var trans = education.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == langCode.ToLower()).FirstOrDefault();

                if (trans == null) {
                    trans = education.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == "en").FirstOrDefault();
                }

                if (trans != null) {
                    educationList.Add(MappingHelper.MapEducationTranslationToOpenModel(trans));
                }                
             }

            return educationList;
        } 

        private async Task<ICollection<ExperienceTranslationOpen>> GetExperienceList(string langCode)
        {
            var experiences = await _context.PortfolioExperiences.Where(x => x.Enabled && x.EnabledInWeb)
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            .ToListAsync();

            var experienceList = new List<ExperienceTranslationOpen>();

            foreach (var experience in experiences) {
                if (experience.Translations == null) {
                    continue;
                }

                var trans = experience.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == langCode.ToLower()).FirstOrDefault();

                if (trans == null) {
                    trans = experience.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == "en").FirstOrDefault();
                }

                if (trans != null) {
                    // experienceList.Add(MappingHelper.MapExperienceTranslationToOpenModel(trans));
                }                
             }

            return experienceList;
        }

        private async Task<ICollection<InterestTranslationOpen>> GetInterestList(string langCode)
        {
            var interests = await _context.PortfolioInterests.Where(x => x.Enabled && x.EnabledInWeb)
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            .ToListAsync();

            var interestList = new List<InterestTranslationOpen>();

            foreach (var interest in interests) {
                if (interest.Translations == null) {
                    continue;
                }

                var trans = interest.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == langCode.ToLower()).FirstOrDefault();

                if (trans == null) {
                    trans = interest.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == "en").FirstOrDefault();
                }

                if (trans != null) {
                    // interestList.Add(MappingHelper.MapInterestTranslationToOpenModel(trans));
                }                
             }

            return interestList;
        }

        private async Task<ICollection<LanguageTranslationOpen>> GetLanguageList(string langCode)
        {
            var languages = await _context.PortfolioLanguages.Where(x => x.Enabled && x.EnabledInWeb)
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            .ToListAsync();

            var languageList = new List<LanguageTranslationOpen>();

            foreach (var language in languages) {
                if (language.Translations == null) {
                    continue;
                }

                var trans = language.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == langCode.ToLower()).FirstOrDefault();

                if (trans == null) {
                    trans = language.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == "en").FirstOrDefault();
                }

                if (trans != null) {
                    // languageList.Add(MappingHelper.MapLanguageTranslationToOpenModel(trans));
                }                
             }

            return languageList;
        }

        private async Task<ICollection<ProjectTranslationOpen>> GetProjectList(string langCode)
        {
            var projects = await _context.PortfolioProjects.Where(x => x.Enabled && x.EnabledInWeb)
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            .ToListAsync();

            var projectList = new List<ProjectTranslationOpen>();

            foreach (var project in projects) {
                if (project.Translations == null) {
                    continue;
                }

                var trans = project.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == langCode.ToLower()).FirstOrDefault();

                if (trans == null) {
                    trans = project.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == "en").FirstOrDefault();
                }

                if (trans != null) {
                    // projectList.Add(MappingHelper.MapProjectTranslationToOpenModel(trans));
                }                
             }

            return projectList;
        }

                private async Task<ICollection<QualificationTranslationOpen>> GetQualificationList(string langCode)
        {
            var qualifications = await _context.PortfolioQualifications.Where(x => x.Enabled && x.EnabledInWeb)
                            .Include(x => x.Translations).ThenInclude(x => x.Language)
                            .ToListAsync();

            var qualificationList = new List<QualificationTranslationOpen>();

            foreach (var qualification in qualifications) {
                if (qualification.Translations == null) {
                    continue;
                }

                var trans = qualification.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == langCode.ToLower()).FirstOrDefault();

                if (trans == null) {
                    trans = qualification.Translations.Where(x => x.Language.LanguageCode != null && x.Language.LanguageCode.Split("-")[0].ToLower() == "en").FirstOrDefault();
                }

                if (trans != null) {
                    // qualificationList.Add(MappingHelper.MapQualificationTranslationToOpenModel(trans));
                }                
             }

            return qualificationList;
        } 
    }
}
