import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  language = "da";
  cvStuff: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCvStuff(this.language);
  }

  getCvStuff(language: string): void {
    this.http.get("https://portfolio.tesj.dk/api/portfolio/getall/" + language).subscribe(x => {
      this.cvStuff = x;
    }, e => {

    });
  }

  checkDate(dateStr: string): boolean {
    return (new Date(dateStr) < new Date());
  }

  download(): void {

    // Default export is a4 paper, portrait, using millimeters for units
    // const doc = new jsPDF();
    // doc.text("Hej lille tulipan", 10, 10);
    // doc.save("Uha.pdf");
  }

}
