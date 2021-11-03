import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-edit-certificates',
  templateUrl: './edit-certificates.component.html'
})
export class EditCertificatesComponent implements OnInit {
  certificates: any;
  baseUrl: string;
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.getCertificates();
  }

  getCertificates(): void {
    this.http.get(this.baseUrl + "api/certificate").subscribe(x => {
      this.certificates = x;
    });
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
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
