import { Component, OnInit } from '@angular/core';
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
  language = "da";
  projects: Project[];

  constructor(private data: CvDataService) {
    this.projects = new Array();
  }

  ngOnInit(): void {
    this.getProjects(this.language);
  }

  getProjects(language: string): void {
    this.data.getPortfolioItems(language).subscribe(x => {
      this.projects = x.projects;
    }, e => {
      if (!environment.production) {
        console.log(e);
      }

      this.errorState = true;
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

  openProject(project: any, index: number): void {
    if (project?.demoUrl) {
      const elm = document.getElementById("demo-" + index);
      if (elm) {
        setTimeout(() => {
          elm.click();
        });
      }
    } else if (project?.docUrl) {
      const elm = document.getElementById("doc-" + index);
      if (elm) {
        setTimeout(() => {
          elm.click();
        });
      }
    } else if (project?.sourceUrl) {
      const elm = document.getElementById("source-" + index);
      if (elm) {
        setTimeout(() => {
          elm.click();
        });
      }
    }
  }

}
