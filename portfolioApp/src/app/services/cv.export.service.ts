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
    const lineHeight = 7;
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
      doc.text(clippedText, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + 80 + (textLines * lineHeight));
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
      doc.setTextColor('Black');
      doc.text(ib, innerMargin + outerMargin, innerMargin + outerMargin + 5);
      doc.setFont('Book-Antikva');
      doc.setFontSize(15);

      let lineNumber = 2;

      for (const bo of (printObj.listItems as any)[ib]) {
        if (bo?.imageUrl) {
          /* Add Image */
          const img = new Image();
          img.src = bo.imageUrl;
          doc.addImage(img, 'png', (width - 35 - innerMargin - outerMargin), (innerMargin + outerMargin + (lineNumber * lineHeight)), lineHeight * 5, lineHeight * 5);
        }

        if (bo?.name) {
          doc.setFontSize(30);
          doc.text(bo.name, innerMargin + outerMargin, innerMargin + outerMargin + 5 + (lineNumber * lineHeight));
          lineNumber++;
          doc.setFontSize(15);
        }

        if (bo?.description) {
          const clippedText = doc.splitTextToSize(this.reformatHtml(bo.description), width - ((outerMargin + innerMargin) * 2) - (lineHeight * 5) - innerMargin);
          doc.text(clippedText, innerMargin + outerMargin, innerMargin + outerMargin + 5 + (lineNumber * lineHeight));
          lineNumber += clippedText.length + 1;
        }
      }
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

  reformatHtml(text: string): string {
    const removers = [ "<p>", "<ul>", "</ul>"];
    const lineBreakers = [ "</p>", "</li>", "</br>"];
    const listItems = [ "<li>" ];

    for (const tag of removers) {
      while (text.includes(tag)) {
        text = text.replace(tag, "");
      }
    }

    for (const tag of lineBreakers) {
      while (text.includes(tag)) {
        text = text.replace(tag, "\n\n");
      }
    }

    for (const tag of listItems) {
      while (text.includes(tag)) {
        text = text.replace(tag, " - ");
      }
    }



    return text;
  }
}


