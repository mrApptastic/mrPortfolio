import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Lato } from './lato';

@Injectable({
  providedIn: 'root'
})
export class CvExportService {

  constructor() { }

  downloadCV(): void {
    alert($localize`:@@397497450705980813:Kontakt`);
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    // doc.addFont('Ringbearer', '', 'normal');
    // doc.setFont('Courier');
    var img = new Image()
    // img.src = "assets/images/Himself.png";
    // doc.addImage(img, 'png', 10, 78, 12, 15);

    // jsPDF.API.events.push(['addFonts', function() {
    //   // doc.addFileToVFS('Lato-Regular-normal.ttf', Lato);
    //   // doc.addFont('Lato-Regular-normal.ttf', 'Lato-Regular', 'normal');
    // }]);

    doc.addFileToVFS('Lato-Regular-normal.ttf', Lato);
    doc.addFont('Lato-Regular-normal.ttf', 'Lato-Regular', 'normal');

    doc.setFont('Lato-Regular');
    doc.text("Lato - Hej lille tulipan", 10, 10);
    doc.save("Uha.pdf");
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

