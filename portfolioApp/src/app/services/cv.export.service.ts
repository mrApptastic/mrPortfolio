import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Ringbearer } from './data-fonts/ringbearer';
import { BookAntikva } from './data-fonts/book-antikva';
import { PortfolioPrint } from '../models/portfolio-print';
import { PortfolioList } from '../models/portfolio-list';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class CvExportService {

  constructor(@Inject(LOCALE_ID) public locale: string, private time: TimeService) { }

  downloadCV(list: PortfolioList): void {
    const printObj = this.generatePrintObject(list);
    const doc = new jsPDF();
    const height = doc.internal.pageSize.getHeight();
    const width = doc.internal.pageSize.getWidth();
    const outerMargin = 10;
    const innerMargin = 5;
    const pageBase = 5;
    const lineHeight = 7;
    const headingLineHeight = 10;
    const headingOffset = 10;
    const headingSize = 30;
    const subHeadingSize = 20;
    const paragraphSize = 13;
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
    doc.setFontSize(headingSize);
    doc.setTextColor('Silver');
    doc.text('Curriculum Vitae', outerMargin, outerMargin + innerMargin);

    /* Add Page Number */
    doc.text(pageNumber.toString(), (width / 2), height - 2);

    /* Add Image */
    var img = new Image();
    img.src = 'assets/images/Me.png';
    doc.addImage(img, 'png', (width - portraitSize - innerMargin - outerMargin), (headingOffset + innerMargin + outerMargin), portraitSize, portraitSize);

    /* Add Info Box */
    doc.setFontSize(paragraphSize);
    doc.setTextColor('Black');
    doc.text("Navn:", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + pageBase);
    doc.text("Profession:", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 2));
    doc.text("Telefonnummer:", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 4));
    doc.text("E-mail:", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 6));
    doc.text($localize`:@@7644300011746296925:Kort Beskrivelse` + ":", innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + ((pageBase * 2) + lineHeight * 9));
    doc.addFileToVFS('Book-Antikva-Regular.ttf', BookAntikva);
    doc.addFont('Book-Antikva-Regular.ttf', 'Book-Antikva', 'normal');
    doc.setFont('Book-Antikva');
    doc.text(printObj.name, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + + (pageBase + lineHeight * 1));
    doc.text(printObj.profession, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + + (pageBase + lineHeight * 3));
    doc.text(printObj.phoneNumber, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + + (pageBase + lineHeight * 5));
    doc.text(printObj.eMail, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + + (pageBase + lineHeight * 7));

    /* Add Short Description */
    const texts = printObj.shortDescription.split("<BR>");
    let textLines = 0;
    for (const text of texts) {
      const clippedText = doc.splitTextToSize(text, width - ((outerMargin + innerMargin) * 2));
      doc.text(clippedText, innerMargin + outerMargin, innerMargin + outerMargin + headingOffset + ((pageBase * 2) + (lineHeight * 10)) + (textLines * lineHeight));
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
      doc.setFontSize(headingSize);
      doc.setTextColor('Silver');
      doc.text(pageNumber.toString(), (width / 2), height - 2);

      /* Add Heading */
      doc.setTextColor('Black');
      doc.text(this.getHeadingTranslation(ib), innerMargin + outerMargin, innerMargin + outerMargin + 5);
      doc.setFont('Book-Antikva');
      doc.setFontSize(paragraphSize);

      let lineNumber = 2 * lineHeight;

      for (const bo of (printObj.listItems as any)[ib]) {
        let tempLineNumber = 0;
        let extraOffset = 0;

        if (bo?.name) {
          const clippedText = doc.splitTextToSize(this.reformatHtml(bo.name), width - ((outerMargin + innerMargin) * 2) - (lineHeight * 5) - innerMargin);
          tempLineNumber += (clippedText.length * (headingLineHeight - 1));
        }

        if (bo?.place) {
          tempLineNumber += 1 * lineHeight;
        }

        if (bo?.from) {
          tempLineNumber += 1 * lineHeight;
        }

        if (bo?.description) {
          const clippedText = doc.splitTextToSize(this.reformatHtml(bo.description), width - ((outerMargin + innerMargin) * 2) - (lineHeight * 5) - innerMargin);
          tempLineNumber += (clippedText.length * (lineHeight - 1));
        }

        if ((lineNumber + tempLineNumber) > (height - outerMargin * 2 - innerMargin * 2)) {
          lineNumber = 2 * lineHeight;
          doc.addPage();
          pageNumber++;

          /* Draw boxes */
          doc.setFillColor('DarkSlateGray');
          doc.rect(0, 0, width, height, 'F');
          doc.setFillColor("Snow");
          doc.rect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2, 'F');

          /* Add Page Number */
          doc.setFont('Ringbearer');
          doc.setFontSize(headingSize);
          doc.setTextColor('Silver');
          doc.text(pageNumber.toString(), (width / 2), height - 2);

          /* Add Heading */
          doc.setTextColor('Black');
          doc.text(this.getHeadingTranslation(ib), innerMargin + outerMargin, innerMargin + outerMargin + 5);
          doc.setFont('Book-Antikva');
          doc.setFontSize(paragraphSize);
        } else if (bo?.imageUrl && tempLineNumber < lineHeight * 6) {
          extraOffset = lineHeight * 6 - tempLineNumber;
        }

        if (bo?.imageUrl) {
          /* Add Image */
          const img = new Image();
          img.src = bo.imageUrl;
          doc.addImage(img, 'png', (width - (5 * lineHeight) - innerMargin - outerMargin), (innerMargin + outerMargin + lineNumber), lineHeight * 5, lineHeight * 5);

          if (bo?.demoUrl) {
            doc.link((width - (5 * lineHeight) - innerMargin - outerMargin), (innerMargin + outerMargin + lineNumber), lineHeight * 5, lineHeight * 5, { url: bo.demoUrl });
          } else if (bo?.docUrl) {
            doc.link((width - (5 * lineHeight) - innerMargin - outerMargin), (innerMargin + outerMargin + lineNumber), lineHeight * 5, lineHeight * 5, { url: bo.docUrl });
          }
        }

        if (bo?.name) {
          doc.setFontSize(subHeadingSize);
          const clippedText = doc.splitTextToSize(this.reformatHtml(bo.name), width - ((outerMargin + innerMargin) * 2) - (lineHeight * 5) - innerMargin);
          doc.text(clippedText, innerMargin + outerMargin, innerMargin + outerMargin + 5 + lineNumber);
          lineNumber += (clippedText.length * (headingLineHeight - 1));
          doc.setFontSize(paragraphSize);
        }

        if (bo?.place) {
          doc.text(bo.place, innerMargin + outerMargin, innerMargin + outerMargin + 5 + lineNumber);
          lineNumber += 1 * lineHeight;
        }

        if (bo?.from) {
          const time = this.time.formatYear(bo?.from, bo?.to);
          doc.text(time, innerMargin + outerMargin, innerMargin + outerMargin + 5 + lineNumber);
          lineNumber += 1 * lineHeight;
        }

        if (bo?.description) {
          const clippedText = doc.splitTextToSize(this.reformatHtml(bo.description), width - ((outerMargin + innerMargin) * 2) - (lineHeight * 5) - innerMargin);
          doc.text(clippedText, innerMargin + outerMargin, innerMargin + outerMargin + 5 + lineNumber);
          lineNumber += (clippedText.length * (lineHeight - 1));
        }

        lineNumber += extraOffset;
      }
    }

    doc.save(new Date().toJSON().slice(0, 10) + '-' + 'Curriculum_Vitae_Henrik_Beske' + '_' + this.locale + '.pdf');
  }

  generatePrintObject(list: PortfolioList): PortfolioPrint {
    return {
      name: $localize`:@@5235866419448573411:Henrik Beske`,
      profession: $localize`:@@8305623058929365707:Softwareudvikler`,
      address: "",
      postalCodeAndCity: "",
      country: $localize`:@@8604637668329678538:Danmark`,
      phoneNumber: $localize`:@@3989749792732640418:(+45) 24 49 75 55`,
      eMail: $localize`:@@389759894640642615:henrikbeske@gmail.com`,
      shortDescription: $localize`:@@4425630083313782310:Jeg er en kompetent softwareudvikler med en præference i retning af webudvikling samt udvikling til mobile enheder. Endvidere har jeg erfaring fra flere andre områder - såsom desktop applikationsudvikling, og udvikling til indlejrede enheder.` + "\n\n" + $localize`:@@575499127834956632:Desuden er jeg af den opfattelse, at jeg er en innovativ person med mange idéer. Jeg er en teknisk kompetent, dedikeret person, som bliver ved med at arbejde indtil arbejdet er gjort. Jeg arbejder fint både i grupper og individuelt. Kort sagt er jeg en type person, der ser muligheder fremfor barrierer foran mig.`,
      listItems: list
    } as PortfolioPrint;
  }

  reformatHtml(text: string): string {
    if (!text) {
      return "";
    }

    const removers = [ "<p>", "<ul>", "</ul>"];
    const lineBreakers = [ "</p>", "</li>", "</br>"];
    const listItems = [ "<li>" ];

    while(text.includes("\t")) {
      text = text.replace("\t","");
    }

    while(text.includes("\n")) {
      text = text.replace("\n","");
    }

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

  getHeadingTranslation(text: string): string {
    switch(text) {
      case 'certificates': return $localize`:@@7492375559154995019:Certifikater`;
      case 'educations': return $localize`:@@245512719199604556:Uddannelse`;
      case 'experiences': return $localize`:@@2340064925348742945:Erfaring`;
      case 'interests': return $localize`:@@3349742688438436280:Interesser`;
      case 'languages': return $localize`:@@8951055125458694900:Sprog`;
      case 'projects': return $localize`:@@3079002003406197429:Projekter`;
      case 'qualifications': return $localize`:@@2667102750677402001:Kompetencer`;
      default: return '';
    };
  }
}


