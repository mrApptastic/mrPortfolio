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
    const width = doc.internal.pageSize.getWidth();
    const outerMargin = 10;
    const innerMargin = 5;
    const headingOffset = 10;
    const portraitSize = 60;
    let pageNumber = 1;

    /* Draw boxes */
    doc.setFillColor('DarkSlateGray');
    doc.rect(0, 0, width, height, 'F');
    doc.setFillColor("Snow");
    doc.rect(outerMargin, outerMargin + headingOffset, width - outerMargin * 2, height - headingOffset - outerMargin * 2, 'F');

    /* Add Ringbearer */
    doc.addFileToVFS('Ringbearer-Regular.ttf', Ringbearer);
    doc.addFont('Ringbearer-Regular.ttf', 'Ringbearer', 'normal');

    /* Add Heading */
    doc.setFont('Ringbearer');
    doc.setFontSize(30);
    doc.setTextColor('Silver');
    doc.text('Curriculum Vitae', outerMargin, outerMargin + innerMargin);

    /* Add Page Number */
    doc.text(pageNumber.toString(), (width / 2), height - 2);

    /* Add Image */
    var img = new Image();
    img.src = 'assets/images/Me.png';
    doc.addImage(img, 'png', (width - portraitSize - innerMargin - outerMargin), (headingOffset + innerMargin + outerMargin), portraitSize, portraitSize);

    /* Add Info Box */
    doc.setFontSize(15);
    doc.setTextColor('Black');
    doc.text("Navn:", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 5);
    doc.text("Profession:", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 19);
    doc.text("Telefonnummer:", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 33);
    doc.text("E-mail:", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 47);
    doc.text($localize`:@@7644300011746296925:Kort Beskrivelse` + ":", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 73);
    doc.addFileToVFS('Book-Antikva-Regular.ttf', BookAntikva);
    doc.addFont('Book-Antikva-Regular.ttf', 'Book-Antikva', 'normal');
    doc.setFont('Book-Antikva');
    doc.text(printObj.name, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 12);
    doc.text(printObj.profession, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 26);
    doc.text(printObj.phoneNumber, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 40);
    doc.text(printObj.eMail, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 54);

    /* Add Short Description */
    const texts = printObj.shortDescription.split("<BR>");
    let textLines = 0;
    for (const text of texts) {
      const clippedText = doc.splitTextToSize(text, width - ((outerMargin + innerMargin) * 2));
      doc.text(clippedText, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 80 + (textLines * 7));
      textLines += clippedText.length;
    }

    for (let ib in printObj.listItems) {
      doc.addPage();
      pageNumber++;

      /* Draw boxes */
      doc.setFillColor('DarkSlateGray');
      doc.rect(0, 0, width, height, 'F');
      doc.setFillColor("Snow");
      doc.rect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2, 'F');

      /* Add Page Number */
      doc.setFont('Ringbearer');
      doc.setFontSize(30);
      doc.setTextColor('Silver');
      doc.text(pageNumber.toString(), (width / 2), height - 2);

      /* Add Heading */
      doc.text(ib, innerMargin + outerMargin, innerMargin + outerMargin + 5);
    }

    doc.save(new Date().toJSON().slice(0, 10) + 'Curriculum_Vitae_Henrik_Beske.pdf');
  }

  generatePrintObject(list: PortfolioList): PortfolioPrint {
    return {
      name: "Henrik Beske",
      profession: $localize`:@@8305623058929365707:Softwareudvikler`,
      address: "",
      postalCodeAndCity: "",
      country: $localize`:@@8604637668329678538:Danmark`,
      phoneNumber: "(+45) 24 49 75 55",
      eMail: "henrikbeske@gmail.com",
      shortDescription: $localize`:@@4425630083313782310:Jeg er en kompetent softwareudvikler med en præference i retning af webudvikling samt udvikling til mobile enheder. Endvidere har jeg erfaring fra flere andre områder - såsom desktop applikationsudvikling, og udvikling til indlejrede enheder.` + "\n" + "<BR>" + $localize`:@@8027314699805909337:Desuden er jeg af den opfattelse, at jeg er en innovativ person med mange idéer. Jeg er en teknisk kompetent, dedikeret person, som bliver ved med at arbejde indtil arbejdet er gjort. Jeg arbejder fint både i grupper og individuelt. Kort sagt er jeg en type person, der ser muligheder fremfor barrierer foran mig.`,
      listItems: list
    } as PortfolioPrint;
  }
}


