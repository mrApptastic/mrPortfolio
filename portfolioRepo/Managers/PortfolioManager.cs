using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using PortfolioRepo.Data;
using PortfolioRepo.Models;
using PortfolioRepo.Helpers;

namespace PortfolioRepo.Managers
{
	public interface IPortFolioManager {
        Task<PortfolioOpen> GetAll(string langCode);
	}

    public class PortFolioManager: IPortFolioManager
    {
        private readonly ILogger<PortFolioManager> _logger;
        private readonly ApplicationDbContext _context;
        
        public PortFolioManager(ILogger<PortFolioManager> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<PortfolioOpen> GetAll(string langCode)
        {
            return new PortfolioOpen() {
                Certificates = await GetCertificateList(langCode),
                Educations = await GetEducationList(langCode),
                Experiences = await GetExperienceList(langCode),
                Interests = await GetInterestList(langCode),
                Languages = await GetLanguageList(langCode),
                Projects = await GetProjectList(langCode),
                Qualifications = await GetQualificationList(langCode)
            };
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
                    certificateList.Add(new CertificateTranslationOpen() {
                        Description = trans.Description,
                        Name = trans.Name,
                        Place = trans.Place,
                        From = certificate.From,
                        To = certificate.To,
                        ImageUrl = certificate.ImageUrl != null && certificate.ImageUrl.Length > 0 ? ImageHelper.ConvertToDataUrl(certificate.ImageUrl) :  ""                     
                    });
                }                
             }

            return certificateList.OrderByDescending(x => x.From).ThenBy(x => x.Name).ToList();
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
                    educationList.Add(new EducationTranslationOpen() {
                        Description = trans.Description,
                        Name = trans.Name,
                        Place = trans.Place,
                        From = education.From,
                        To = education.To,
                        ImageUrl = education.ImageUrl != null && education.ImageUrl.Length > 0 ? ImageHelper.ConvertToDataUrl(education.ImageUrl) :  ""    
                    });
                }                
             }

            return educationList.OrderByDescending(x => x.From).ThenBy(x => x.Name).ToList();
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
                    experienceList.Add(new ExperienceTranslationOpen() {
                        Description = trans.Description,
                        Name = trans.Name,
                        Place = trans.Place,
                        From = experience.From,
                        To = experience.To,
                        ImageUrl = experience.ImageUrl != null && experience.ImageUrl.Length > 0 ? ImageHelper.ConvertToDataUrl(experience.ImageUrl) :  ""     
                    });
                }                
             }

            return experienceList.OrderByDescending(x => x.From).ThenBy(x => x.Name).ToList();
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
                    interestList.Add(new InterestTranslationOpen() {
                        Description = trans.Description,
                        Name = trans.Name,
                        ImageUrl = interest.ImageUrl != null && interest.ImageUrl.Length > 0 ? ImageHelper.ConvertToDataUrl(interest.ImageUrl) :  ""    
                    });
                }                
             }

            return interestList.OrderBy(x => x.Name).ToList();
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
                    languageList.Add(new LanguageTranslationOpen() {
                        Description = trans.Description,
                        Name = trans.Name,
                        ImageUrl = language.ImageUrl != null && language.ImageUrl.Length > 0 ? ImageHelper.ConvertToDataUrl(language.ImageUrl) :  ""   
                    });
                }                
             }

            return languageList.OrderBy(x => x.Name).ToList();
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
                    projectList.Add(new ProjectTranslationOpen() {
                        Description = trans.Description,
                        Name = trans.Name,
                        Place = trans.Place,
                        From = project.From,
                        To = project.To,
                        ImageUrl = project.ImageUrl != null && project.ImageUrl.Length > 0 ? ImageHelper.ConvertToDataUrl(project.ImageUrl) :  "",  
                        DemoUrl = project.DemoUrl,
                        DocUrl = project.DocUrl,
                        SourceUrl = project.SourceUrl
                    });
                }                
             }

            return projectList.OrderByDescending(x => x.From).ThenBy(x => x.Name).ToList();
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
                    qualificationList.Add(new QualificationTranslationOpen() {
                        Description = trans.Description,
                        Name = trans.Name,
                        ImageUrl = qualification.ImageUrl != null && qualification.ImageUrl.Length > 0 ? ImageHelper.ConvertToDataUrl(qualification.ImageUrl) :  ""    
                    });
                }                
             }

            return qualificationList.OrderBy(x => x.Name).ToList();
        } 
    }
}
