import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-languages',
  templateUrl: './edit-languages.component.html'
})
export class EditLanguagesComponent implements OnInit {
  languages: any;
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
    this.getLanguages();
  }

  getLanguages(): void {
    forkJoin([
      this.http.get(this.baseUrl + "api/language?useForWeb=false"),
      this.http.get(this.baseUrl + "api/language/newTranslation/en"),
      this.http.get(this.baseUrl + "api/language/newTranslation/da"),
      this.http.get(this.baseUrl + "api/language/new"),
    ]).subscribe(x => {
      this.languages = x[0];
      this.newTemplateEn = x[1];
      this.newTemplateDa = x[2];
      this.newTemplate = x[3];

      for (const language of this.languages) {
        if (!language.translations.some(t => t.language && t.language.languageCode === "en-GB")) {
           language.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
        }
        if (!language.translations.some(t => t.language && t.language.languageCode === "da-DK")) {
          language.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
       }
      }
    });
  }

  addLanguage(): void {
    const newLanguage = JSON.parse(JSON.stringify(this.newTemplate));
    newLanguage.translations = new Array();
    newLanguage.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
    newLanguage.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
    this.http.post(this.baseUrl + "api/language", newLanguage).subscribe(x => {
      this.http.get(this.baseUrl + "api/language?useForWeb=false", newLanguage).subscribe(c => {
        this.languages = c;
      });
    });
  }

  changeLanguage(language: any): void {
    this.http.put(this.baseUrl + "api/language?useForWeb=" + language.enabledInWeb, language).subscribe(x => {
      this.toastr.success('Hello world!', 'Toastr fun!');
      // this.languages = x;
    });
  }

  deleteLanguage(language: any): void {
    this.http.delete(this.baseUrl + "api/language/" + language.eId).subscribe(x => {
      const index = this.languages.findIndex(i => i.eId === language.eId);
      if (index > -1) {
        this.languages.splice(index, 1);
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
          const uploadItem = this.languages.find(x => x.eId === this.uploadId);
          if (uploadItem) {
            uploadItem.imageUrl = name;
            this.changeLanguage(uploadItem);
          }
        }
      });
  }
}

// interface Languages {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }

// http.get<any>(baseUrl + 'weatherforecast').subscribe(result => {
//   this.forecasts = result;
// }, error => console.error(error));
