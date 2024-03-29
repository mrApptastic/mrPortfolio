import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-certificates',
  templateUrl: './edit-certificates.component.html'
})
export class EditCertificatesComponent implements OnInit {
  certificates: any;
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
    this.getCertificates();
  }

  getCertificates(): void {
    forkJoin([
      this.http.get(this.baseUrl + "api/certificate?useForWeb=false"),
      this.http.get(this.baseUrl + "api/certificate/newTranslation/en"),
      this.http.get(this.baseUrl + "api/certificate/newTranslation/da"),
      this.http.get(this.baseUrl + "api/certificate/new"),
    ]).subscribe(x => {
      this.certificates = x[0];
      this.newTemplateEn = x[1];
      this.newTemplateDa = x[2];
      this.newTemplate = x[3];

      for (const certificate of this.certificates) {
        if (!certificate.translations.some(t => t.language && t.language.languageCode === "en-GB")) {
           certificate.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
        }
        if (!certificate.translations.some(t => t.language && t.language.languageCode === "da-DK")) {
          certificate.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
       }
      }
    });
  }

  addCertificate(): void {
    const newCertificate = JSON.parse(JSON.stringify(this.newTemplate));
    newCertificate.from = new Date();
    newCertificate.to = new Date();
    newCertificate.translations = new Array();
    newCertificate.translations.push(JSON.parse(JSON.stringify(this.newTemplateEn)));
    newCertificate.translations.push(JSON.parse(JSON.stringify(this.newTemplateDa)));
    this.http.post(this.baseUrl + "api/certificate", newCertificate).subscribe(x => {
      this.http.get(this.baseUrl + "api/certificate?useForWeb=false", newCertificate).subscribe(c => {
        this.certificates = c;
      });
    });
  }

  changeCertificate(certificate: any): void {
    this.http.put(this.baseUrl + "api/certificate?useForWeb=" + certificate.enabledInWeb, certificate).subscribe(x => {
      this.toastr.success('Hello world!', 'Toastr fun!');
      // this.certificates = x;
    });
  }

  deleteCertificate(certificate: any): void {
    this.http.delete(this.baseUrl + "api/certificate/" + certificate.eId).subscribe(x => {
      const index = this.certificates.findIndex(i => i.eId === certificate.eId);
      if (index > -1) {
        this.certificates.splice(index, 1);
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
          const uploadItem = this.certificates.find(x => x.eId === this.uploadId);
          if (uploadItem) {
            uploadItem.imageUrl = name;
            this.changeCertificate(uploadItem);
          }
        }
      });
  }
}

// interface Certificates {
//   date: string;
//   temperatureC: number;
//   temperatureF: number;
//   summary: string;
// }

// http.get<any>(baseUrl + 'weatherforecast').subscribe(result => {
//   this.forecasts = result;
// }, error => console.error(error));
