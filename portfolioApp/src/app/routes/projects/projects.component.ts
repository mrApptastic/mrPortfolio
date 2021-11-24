import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  language = "da";
  projects: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProjects(this.language);
  }

  getProjects(language: string): void {
    this.http.get("https://portfolio.tesj.dk/api/portfolio/getall/" + language).subscribe(x => {
      this.projects = (x as any)?.projects; // (x as any)?.projects.filter((f: any) => f.demoUrl?.length > 0);
    }, e => {

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
