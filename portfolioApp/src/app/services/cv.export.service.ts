import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Ringbearer } from './data-fonts/ringbearer';
import { BookAntikva } from './data-fonts/book-antikva';
import { PortfolioPrint } from '../models/portfolio-print';
import { PortfolioList } from '../models/portfolio-list';

@Injectable({
  providedIn: 'root'
})
export class CvExportService {

  constructor() { }

  downloadCV(list: PortfolioList): void {
    const printObj = this.generatePrintObject(list);

    const doc = new jsPDF();
    const height = doc.internal.pageSize.getHeight();
    const width = doc.internal.pageSize.getWidth();;
    const outerMargin = 10;
    const innerMargin = 5;
    let pageNumber = 1;

    /* Draw boxes */
    doc.setFillColor(0, 206, 209);
    doc.rect(0, 0, width, height, 'F');
    doc.setFillColor(255, 255, 255);
    doc.rect(0 + outerMargin, 0 + outerMargin, width - outerMargin * 2, height - outerMargin * 2, 'F');

    /* Add Ringbearer */
    doc.addFileToVFS('Ringbearer-Regular.ttf', Ringbearer);
    doc.addFont('Ringbearer-Regular.ttf', 'Ringbearer', 'normal');
    doc.setFont('Ringbearer');

    var img = new Image();
    img.src = "assets/images/Himself.png";
    doc.addImage(img, 'png', 0, 0, width, height);

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


