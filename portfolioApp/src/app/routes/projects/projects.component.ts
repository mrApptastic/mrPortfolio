import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Project } from 'src/app/models/portfolio-list';
import { CvDataService } from 'src/app/services/cv.data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  errorState = false;
  projects: Project[];

  constructor(private data: CvDataService, @Inject(LOCALE_ID) public locale: string) {
    this.projects = new Array();
  }

  ngOnInit(): void {
    this.getProjects(this.locale);
  }

  getProjects(language: string): void {
    this.data.getPortfolioItems(language).subscribe(x => {
      this.projects = x.projects.filter(x => x.demoUrl || x.docUrl || x.sourceUrl);
    }, e => {
      if (!environment.production) {
        console.log(e);
      }
      this.data.getStaticPortfolioItems(language).subscribe(x => {
        this.projects = x.projects.filter(x => x.demoUrl || x.docUrl || x.sourceUrl);
      });
    });
  }

  checkProject(project: any): boolean {
    for (const prop in project) {
      if ((prop === "demoUrl" || prop === "docUrl" || prop === "sourceUrl") && project[prop]?.length > 0) {
        return true;
      }
    }
    return false;
  }

  getLink(project: any) {
    if (project?.demoUrl) {
      return project?.demoUrl;
    } else if (project?.docUrl) {
      return project?.docUrl;
    } else if (project?.sourceUrl) {
      return project?.sourceUrl;
    } else {
      return null;
    }
  }
}
