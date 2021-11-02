import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-certificates',
  templateUrl: './edit-certificates.component.html'
})
export class EditCertificatesComponent implements OnInit {
  certificates: any;
  baseUrl: string;


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.getCertificates();
  }

  getCertificates(): void {
    this.http.get(this.baseUrl + "api/portfolio/getall/da").subscribe(x => {
      this.certificates = x;
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
