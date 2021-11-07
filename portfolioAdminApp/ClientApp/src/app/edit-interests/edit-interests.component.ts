import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-interests',
  templateUrl: './edit-interests.component.html'
})
export class EditInterestsComponent implements OnInit {
  interests: any;
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
    this.getInterests();
  }

  getInterests(): void {
    forkJoin([
      this.http.get(this.baseUrl + "api/interest?useForWeb=false"),
      this.http.get(this.baseUrl + "api/interest/newTranslation/en"),
      this.http.get(this.baseUrl + "api/interest/newTranslation/da"),
      this.http.get(this.baseUrl + "api/interest/new"),
    ]).subscribe(x => {
      this.interests = x[0];
      this.newTemplateEn = x[1];
      this.newTemplateDa = x[2];
      this.newTemplate = x[3];

      for (const interest of this.interests) {
        if (!interest.translations.some(t => t.language && t.language.languageCode === "en-GB")) {
           interest.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
        }
        if (!interest.translations.some(t => t.language && t.language.languageCode === "da-DK")) {
          interest.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
       }
      }
    });
  }

  addInterest(): void {
    const newInterest = JSON.parse(JSON.stringify(this.newTemplate));
    newInterest.translations = new Array();
    newInterest.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
    newInterest.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
    this.http.post(this.baseUrl + "api/interest", newInterest).subscribe(x => {
      this.http.get(this.baseUrl + "api/interest?useForWeb=false", newInterest).subscribe(c => {
        this.interests = c;
      });
    });
  }

  changeInterest(interest: any): void {
    this.http.put(this.baseUrl + "api/interest?useForWeb=" + interest.enabledInWeb, interest).subscribe(x => {
      this.toastr.success('Hello world!', 'Toastr fun!');
      // this.interests = x;
    });
  }

  deleteInterest(interest: any): void {
    this.http.delete(this.baseUrl + "api/interest/" + interest.eId).subscribe(x => {
      const index = this.interests.findIndex(i => i.eId === interest.eId);
      if (index > -1) {
        this.interests.splice(index, 1);
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
          const uploadItem = this.interests.find(x => x.eId === this.uploadId);
          if (uploadItem) {
            uploadItem.imageUrl = name;
            this.changeInterest(uploadItem);
          }
        }
      });
  }
}

// interface Interests {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }

// http.get<any>(baseUrl + 'weatherforecast').subscribe(result => {
//   this.forecasts = result;
// }, error => console.error(error));
