import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html'
})
export class EditProjectsComponent implements OnInit {
  projects: any;
  newTemplateEn: any;
  newTemplateDa: any;
  newTemplate: any;
  baseUrl: string;
  progress: number;
  message: string;
  uploadId: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private toastr: ToastrService) {
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    forkJoin([
      this.http.get(this.baseUrl + "api/project?useForWeb=false"),
      this.http.get(this.baseUrl + "api/project/newTranslation/en"),
      this.http.get(this.baseUrl + "api/project/newTranslation/da"),
      this.http.get(this.baseUrl + "api/project/new"),
    ]).subscribe(x => {
      this.projects = x[0];
      this.newTemplateEn = x[1];
      this.newTemplateDa = x[2];
      this.newTemplate = x[3];

      for (const project of this.projects) {
        if (!project.translations.some(t => t.language && t.language.languageCode === "en-GB")) {
           project.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
        }
        if (!project.translations.some(t => t.language && t.language.languageCode === "da-DK")) {
          project.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
       }
      }
    });
  }

  addProject(): void {
    const newProject = JSON.parse(JSON.stringify(this.newTemplate));
    newProject.from = new Date();
    newProject.to = new Date();
    newProject.translations = new Array();
    newProject.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
    newProject.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
    this.http.post(this.baseUrl + "api/project", newProject).subscribe(x => {
      this.http.get(this.baseUrl + "api/project?useForWeb=false", newProject).subscribe(c => {
        this.projects = c;
      });
    });
  }

  changeProject(project: any): void {
    this.http.put(this.baseUrl + "api/project?useForWeb=" + project.enabledInWeb, project).subscribe(x => {
      this.toastr.success('Hello world!', 'Toastr fun!');
      // this.projects = x;
    });
  }

  deleteProject(project: any): void {
    this.http.delete(this.baseUrl + "api/project/" + project.eId).subscribe(x => {
      const index = this.projects.findIndex(i => i.eId === project.eId);
      if (index > -1) {
        this.projects.splice(index, 1);
      }
    });
  }

  uploadFile (files): void {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    const name = new Date().getTime().toString() + "." + fileToUpload.name.split(".")[1];
    formData.append('file', fileToUpload, name);
    this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          const uploadItem = this.projects.find(x => x.eId === this.uploadId);
          if (uploadItem) {
            uploadItem.imageUrl = name;
            this.changeProject(uploadItem);
          }
        }
      });
  }
}

// interface Projects {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }

// http.get<any>(baseUrl + 'weatherforecast').subscribe(result => {
//   this.forecasts = result;
// }, error => console.error(error));
