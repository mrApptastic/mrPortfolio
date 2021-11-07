import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-qualifications',
  templateUrl: './edit-qualifications.component.html'
})
export class EditQualificationsComponent implements OnInit {
  qualifications: any;
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
    this.getQualifications();
  }

  getQualifications(): void {
    forkJoin([
      this.http.get(this.baseUrl + "api/qualification?useForWeb=false"),
      this.http.get(this.baseUrl + "api/qualification/newTranslation/en"),
      this.http.get(this.baseUrl + "api/qualification/newTranslation/da"),
      this.http.get(this.baseUrl + "api/qualification/new"),
    ]).subscribe(x => {
      this.qualifications = x[0];
      this.newTemplateEn = x[1];
      this.newTemplateDa = x[2];
      this.newTemplate = x[3];

      for (const qualification of this.qualifications) {
        if (!qualification.translations.some(t => t.language && t.language.languageCode === "en-GB")) {
           qualification.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
        }
        if (!qualification.translations.some(t => t.language && t.language.languageCode === "da-DK")) {
          qualification.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
       }
      }
    });
  }

  addQualification(): void {
    const newQualification = JSON.parse(JSON.stringify(this.newTemplate));
    newQualification.translations = new Array();
    newQualification.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
    newQualification.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
    this.http.post(this.baseUrl + "api/qualification", newQualification).subscribe(x => {
      this.http.get(this.baseUrl + "api/qualification?useForWeb=false", newQualification).subscribe(c => {
        this.qualifications = c;
      });
    });
  }

  changeQualification(qualification: any): void {
    this.http.put(this.baseUrl + "api/qualification?useForWeb=" + qualification.enabledInWeb, qualification).subscribe(x => {
      this.toastr.success('Hello world!', 'Toastr fun!');
      // this.qualifications = x;
    });
  }

  deleteQualification(qualification: any): void {
    this.http.delete(this.baseUrl + "api/qualification/" + qualification.eId).subscribe(x => {
      const index = this.qualifications.findIndex(i => i.eId === qualification.eId);
      if (index > -1) {
        this.qualifications.splice(index, 1);
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
          const uploadItem = this.qualifications.find(x => x.eId === this.uploadId);
          if (uploadItem) {
            uploadItem.imageUrl = name;
            this.changeQualification(uploadItem);
          }
        }
      });
  }
}
