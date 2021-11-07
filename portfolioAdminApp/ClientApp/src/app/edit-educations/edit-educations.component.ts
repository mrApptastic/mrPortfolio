import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-educations',
  templateUrl: './edit-educations.component.html'
})
export class EditEducationsComponent implements OnInit {
  educations: any;
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
    this.getEducations();
  }

  getEducations(): void {
    forkJoin([
      this.http.get(this.baseUrl + "api/education?useForWeb=false"),
      this.http.get(this.baseUrl + "api/education/newTranslation/en"),
      this.http.get(this.baseUrl + "api/education/newTranslation/da"),
      this.http.get(this.baseUrl + "api/education/new"),
    ]).subscribe(x => {
      this.educations = x[0];
      this.newTemplateEn = x[1];
      this.newTemplateDa = x[2];
      this.newTemplate = x[3];

      for (const education of this.educations) {
        if (!education.translations.some(t => t.language && t.language.languageCode === "en-GB")) {
           education.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
        }
        if (!education.translations.some(t => t.language && t.language.languageCode === "da-DK")) {
          education.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
       }
      }
    });
  }

  addEducation(): void {
    const newEducation = JSON.parse(JSON.stringify(this.newTemplate));
    newEducation.from = new Date();
    newEducation.to = new Date();
    newEducation.translations = new Array();
    newEducation.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
    newEducation.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
    this.http.post(this.baseUrl + "api/education", newEducation).subscribe(x => {
      this.http.get(this.baseUrl + "api/education?useForWeb=false", newEducation).subscribe(c => {
        this.educations = c;
      });
    });
  }

  changeEducation(education: any): void {
    this.http.put(this.baseUrl + "api/education?useForWeb=" + education.enabledInWeb, education).subscribe(x => {
      this.toastr.success('Hello world!', 'Toastr fun!');
      // this.educations = x;
    });
  }

  deleteEducation(education: any): void {
    this.http.delete(this.baseUrl + "api/education/" + education.eId).subscribe(x => {
      const index = this.educations.findIndex(i => i.eId === education.eId);
      if (index > -1) {
        this.educations.splice(index, 1);
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
          const uploadItem = this.educations.find(x => x.eId === this.uploadId);
          if (uploadItem) {
            uploadItem.imageUrl = name;
            this.changeEducation(uploadItem);
          }
        }
      });
  }
}
