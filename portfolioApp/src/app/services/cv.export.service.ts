import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Lato } from './lato';
import { BookAntikva } from './book-antikva';
import { PortfolioPrint } from '../models/portfolio-print';
import { PortfolioList } from '../models/portfolio-list';

@Injectable({
  providedIn: 'root'
})
export class CvExportService {

  constructor() { }

  downloadCV(list: PortfolioList): void {
    const printObj = this.generatePrintObject(list);

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    // doc.addFont('Ringbearer', '', 'normal');
    // doc.setFont('Courier');
    var img = new Image()
    img.src = "assets/images/Himself.png";
    doc.addImage(img, 'png', 10, 18, 120, 150);

    // jsPDF.API.events.push(['addFonts', function() {
    //   // doc.addFileToVFS('Lato-Regular-normal.ttf', Lato);
    //   // doc.addFont('Lato-Regular-normal.ttf', 'Lato-Regular', 'normal');
    // }]);

    // doc.addFileToVFS('Lato-Regular-normal.ttf', Lato);
    // doc.addFont('Lato-Regular-normal.ttf', 'Lato-Regular', 'normal');
    doc.addFileToVFS('Book-Antikva-Regular.ttf', BookAntikva);
    doc.addFont('Book-Antikva-Regular.ttf', 'Book-Antikva', 'normal');
    doc.setFont('Book-Antikva');
    doc.text(printObj.name, 10, 10);
    doc.text(printObj.profession, 10, 20);
    doc.text(printObj.address, 10, 30);
    doc.text(printObj.postalCodeAndCity, 10, 40);
    doc.text(printObj.country, 10, 50);
    doc.text(printObj.phoneNumber, 10, 60);
    doc.text(printObj.eMail, 10, 70);
    doc.text(printObj.shortDescription, 10, 80);
    doc.save("Uha.pdf");
  }

  generatePrintObject(list: PortfolioList): PortfolioPrint {
    return {
      name: "Henrik Beske",
      profession: $localize`:@@8305623058929365707:Softwareudvikler`,
      address: "Sallingsundvej 18 st th",
      postalCodeAndCity: "9220 Aalborg Øst",
      country: "Danmark",
      phoneNumber: "(+45) 24 49 75 55",
      eMail: "henrikbeske@gmail.com",
      shortDescription: "hej",
      listItems: list
    } as PortfolioPrint;
  }
}
// console.log(window.location.href.split(window.location.host)[1].split('/')[1]);
// changeLanguage(lang: string): void {
//   if (lang === "da-DK") {
//     // tslint:disable-next-line: no-string-literal
//     document.getElementsByClassName("languageLinks")[0]["click"]();
//   } else if (lang === "sv-SE") {
//     // tslint:disable-next-line: no-string-literal
//     document.getElementsByClassName("languageLinks")[2]["click"]();
//   } else {
//     // tslint:disable-next-line: no-string-literal
//     document.getElementsByClassName("languageLinks")[1]["click"]();
//   }
// }
// <ul [hidden]="true">
//   <li>
//     <a class="languageLinks" (click)="setCulture('da-DK')" href="/da">da</a>
//   </li>
//   <li>
//     <a class="languageLinks" (click)="setCulture('en-US')" href="/en">en</a>
//   </li>
//   <li>
//     <a class="languageLinks" (click)="setCulture('sv-SE')" href="/sv">sv</a>
//   </li>
// </ul>

