import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-experiences',
  templateUrl: './edit-experiences.component.html'
})
export class EditExperiencesComponent implements OnInit {
  experiences: any;
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
    this.getExperiences();
  }

  getExperiences(): void {
    forkJoin([
      this.http.get(this.baseUrl + "api/experience?useForWeb=false"),
      this.http.get(this.baseUrl + "api/experience/newTranslation/en"),
      this.http.get(this.baseUrl + "api/experience/newTranslation/da"),
      this.http.get(this.baseUrl + "api/experience/new"),
    ]).subscribe(x => {
      this.experiences = x[0];
      this.newTemplateEn = x[1];
      this.newTemplateDa = x[2];
      this.newTemplate = x[3];

      for (const experience of this.experiences) {
        if (!experience.translations.some(t => t.language && t.language.languageCode === "en-GB")) {
           experience.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
        }
        if (!experience.translations.some(t => t.language && t.language.languageCode === "da-DK")) {
          experience.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
       }
      }
    });
  }

  addExperience(): void {
    const newExperience = JSON.parse(JSON.stringify(this.newTemplate));
    newExperience.from = new Date();
    newExperience.to = new Date();
    newExperience.translations = new Array();
    newExperience.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
    newExperience.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
    this.http.post(this.baseUrl + "api/experience", newExperience).subscribe(x => {
      this.http.get(this.baseUrl + "api/experience?useForWeb=false", newExperience).subscribe(c => {
        this.experiences = c;
      });
    });
  }

  changeExperience(experience: any): void {
    this.http.put(this.baseUrl + "api/experience?useForWeb=" + experience.enabledInWeb, experience).subscribe(x => {
      this.toastr.success('Hello world!', 'Toastr fun!');
      // this.experiences = x;
    });
  }

  deleteExperience(experience: any): void {
    this.http.delete(this.baseUrl + "api/experience/" + experience.eId).subscribe(x => {
      const index = this.experiences.findIndex(i => i.eId === experience.eId);
      if (index > -1) {
        this.experiences.splice(index, 1);
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
          const uploadItem = this.experiences.find(x => x.eId === this.uploadId);
          if (uploadItem) {
            uploadItem.imageUrl = name;
            this.changeExperience(uploadItem);
          }
        }
      });
  }
}

// interface Experiences {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }

// http.get<any>(baseUrl + 'weatherforecast').subscribe(result => {
//   this.forecasts = result;
// }, error => console.error(error));
