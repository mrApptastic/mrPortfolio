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
      this.projects = (x as any)?.projects.filter((f: any) => f.demoUrl?.length > 0);
    }, e => {

    });
  }

}
