import { jsPDF } from 'jspdf';
import { Ringbearer } from './Ringbearer';
import { BookAntikva } from './BookAntikva';
import { portrait } from './Portrait';
import * as helpers from './Helpers';

export function ExportPDF(items: any): void {
  const printObj = generatePrintObject(items);
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
  const paragraphSize = 12;
  const portraitSize = 60;
  const locale = 'en';
  let pageNumber = 1;

  /* Draw boxes */
  doc.setFillColor('DarkSlateGray');
  doc.rect(0, 0, width, height, 'F');
  doc.setFillColor('Snow');
  doc.rect(
    outerMargin,
    outerMargin + headingOffset,
    width - outerMargin * 2,
    height - headingOffset - outerMargin * 2,
    'F'
  );

  /* Add Ringbearer */
  doc.addFileToVFS('Ringbearer-Regular.ttf', Ringbearer);
  doc.addFont('Ringbearer-Regular.ttf', 'Ringbearer', 'normal');

  /* Add Heading */
  doc.setFont('Ringbearer');
  doc.setFontSize(headingSize);
  doc.setTextColor('Silver');
  doc.text('Curriculum Vitae', outerMargin, outerMargin + innerMargin);

  /* Add Page Number */
  doc.text(pageNumber.toString(), width / 2, height - 2);

  /* Add Image */
  var img = new Image();
  img.src = portrait;
  doc.addImage(
    img,
    'png',
    width - portraitSize - innerMargin - outerMargin,
    headingOffset + innerMargin + outerMargin,
    portraitSize,
    portraitSize
  );

  /* Add Info Box */
  doc.setFontSize(paragraphSize);
  doc.setTextColor('Black');
  doc.text(
    'Name' + ':',
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + pageBase
  );
  doc.text(
    'Profession' + ':',
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 2)
  );
  doc.text(
    'Phone' + ':',
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 4)
  );
  doc.text(
    'E-mail' + ':',
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 6)
  );
  doc.text(
    'Portfolio Site:',
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 8)
  );
  doc.text(
    'Github:',
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 10)
  );
  doc.text(
    'Stackblitz:',
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 12)
  );
  doc.text(
    'Short Description' + ':',
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + (pageBase * 2 + lineHeight * 15)
  );
  doc.addFileToVFS('Book-Antikva-Regular.ttf', BookAntikva);
  doc.addFont('Book-Antikva-Regular.ttf', 'Book-Antikva', 'normal');
  doc.setFont('Book-Antikva');
  doc.text(
    printObj.name,
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 1)
  );
  doc.text(
    printObj.profession,
    innerMargin + outerMargin,
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 3)
  );

  const phoneX =
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 5);
  const phoneY = innerMargin + outerMargin;
  const phoneUrl =
    'tel:' +
    printObj.phoneNumber.replace('(', '').replace(')', '').replaceAll(' ', '');
  console.log(phoneUrl);
  doc.text(printObj.phoneNumber, phoneY, phoneX);
  doc.link(phoneY, phoneX, phoneY - lineHeight * 2, width - phoneX, {
    url: phoneUrl,
  });
  const mailX =
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 7);
  const mailY = innerMargin + outerMargin;
  doc.text(printObj.eMail, mailY, mailX);
  doc.link(mailY, mailX, mailY - lineHeight * 2, width - mailX, {
    url: 'mailto:' + printObj.eMail,
  });
  const portfolioX =
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 9);
  const portfolioY = innerMargin + outerMargin;
  doc.text('http://www.mrapptastic.dk/' + locale, portfolioY, portfolioX);
  doc.link(
    portfolioY,
    portfolioX,
    portfolioY - lineHeight * 2,
    width - portfolioX,
    { url: 'http://www.mrapptastic.dk/' + locale + '/#/' }
  );
  const githubX =
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 11);
  const githubY = innerMargin + outerMargin;
  doc.text('https://github.com/mrApptastic', githubY, githubX);
  doc.link(githubY, githubX, githubY - lineHeight * 2, width - githubX, {
    url: 'https://github.com/mrApptastic',
  });
  const stackblitzX =
    innerMargin + outerMargin + headingOffset + (pageBase + lineHeight * 13);
  const stackblitzY = innerMargin + outerMargin;
  doc.text('https://stackblitz.com/@mrApptastic', stackblitzY, stackblitzX);
  doc.link(
    stackblitzY,
    stackblitzX,
    stackblitzY - lineHeight * 2,
    width - stackblitzX,
    { url: 'https://stackblitz.com/@mrApptastic' }
  );

  /* Add Short Description */
  const texts = printObj.shortDescription.split('<BR>');
  let textLines = 0;
  for (const text of texts) {
    const clippedText = doc.splitTextToSize(
      text,
      width - (outerMargin + innerMargin) * 2
    );
    doc.text(
      clippedText,
      innerMargin + outerMargin,
      innerMargin +
        outerMargin +
        headingOffset +
        (pageBase * 2 + lineHeight * 16) +
        textLines * lineHeight
    );
    textLines += clippedText.length;
  }

  for (let ib in printObj.listItems) {
    doc.addPage();
    pageNumber++;

    /* Draw boxes */
    doc.setFillColor('DarkSlateGray');
    doc.rect(0, 0, width, height, 'F');
    doc.setFillColor('Snow');
    doc.rect(
      outerMargin,
      outerMargin,
      width - outerMargin * 2,
      height - outerMargin * 2,
      'F'
    );

    /* Add Page Number */
    doc.setFont('Ringbearer');
    doc.setFontSize(headingSize);
    doc.setTextColor('Silver');
    doc.text(pageNumber.toString(), width / 2, height - 2);

    /* Add Heading */
    doc.setTextColor('Black');
    doc.text(ib, innerMargin + outerMargin, innerMargin + outerMargin + 5);
    doc.setFont('Book-Antikva');
    doc.setFontSize(paragraphSize);

    let lineNumber = 2 * lineHeight;

    for (const bo of (printObj.listItems as any)[ib]) {
      let tempLineNumber = 0;
      let extraOffset = 0;

      if (bo?.name) {
        const clippedText = doc.splitTextToSize(
          reformatHtml(bo.name),
          width - (outerMargin + innerMargin) * 2 - lineHeight * 5 - innerMargin
        );
        tempLineNumber += clippedText.length * (headingLineHeight - 1);
      }

      if (bo?.place) {
        tempLineNumber += 1 * lineHeight;
      }

      if (bo?.from) {
        tempLineNumber += 1 * lineHeight;
      }

      if (bo?.description) {
        const clippedText = doc.splitTextToSize(
          reformatHtml(bo.description),
          width - (outerMargin + innerMargin) * 2 - lineHeight * 5 - innerMargin
        );
        tempLineNumber += clippedText.length * (lineHeight - 1);
      }

      if (
        lineNumber + tempLineNumber >
        height - outerMargin * 2 - innerMargin * 2
      ) {
        lineNumber = 2 * lineHeight;
        doc.addPage();
        pageNumber++;

        /* Draw boxes */
        doc.setFillColor('DarkSlateGray');
        doc.rect(0, 0, width, height, 'F');
        doc.setFillColor('Snow');
        doc.rect(
          outerMargin,
          outerMargin,
          width - outerMargin * 2,
          height - outerMargin * 2,
          'F'
        );

        /* Add Page Number */
        doc.setFont('Ringbearer');
        doc.setFontSize(headingSize);
        doc.setTextColor('Silver');
        doc.text(pageNumber.toString(), width / 2, height - 2);

        /* Add Heading */
        doc.setTextColor('Black');
        doc.text(ib, innerMargin + outerMargin, innerMargin + outerMargin + 5);
        doc.setFont('Book-Antikva');
        doc.setFontSize(paragraphSize);
      } else if (bo?.imageUrl && tempLineNumber < lineHeight * 6) {
        extraOffset = lineHeight * 6 - tempLineNumber;
      }

      if (bo?.imageUrl) {
        /* Add Image */
        const img = new Image();
        img.src = bo.imageUrl;
        doc.addImage(
          img,
          'png',
          width - 5 * lineHeight - innerMargin - outerMargin,
          innerMargin + outerMargin + lineNumber,
          lineHeight * 5,
          lineHeight * 5
        );

        if (bo?.demoUrl) {
          doc.link(
            width - 5 * lineHeight - innerMargin - outerMargin,
            innerMargin + outerMargin + lineNumber,
            lineHeight * 5,
            lineHeight * 5,
            { url: bo.demoUrl }
          );
        } else if (bo?.docUrl) {
          doc.link(
            width - 5 * lineHeight - innerMargin - outerMargin,
            innerMargin + outerMargin + lineNumber,
            lineHeight * 5,
            lineHeight * 5,
            { url: bo.docUrl }
          );
        }
      }

      if (bo?.name) {
        doc.setFontSize(subHeadingSize);
        const clippedText = doc.splitTextToSize(
          reformatHtml(bo.name),
          width - (outerMargin + innerMargin) * 2 - lineHeight * 5 - innerMargin
        );
        doc.text(
          clippedText,
          innerMargin + outerMargin,
          innerMargin + outerMargin + 5 + lineNumber
        );
        lineNumber += clippedText.length * (headingLineHeight - 1);
        doc.setFontSize(paragraphSize);
      }

      if (bo?.place) {
        doc.text(
          bo.place,
          innerMargin + outerMargin,
          innerMargin + outerMargin + 5 + lineNumber
        );
        lineNumber += 1 * lineHeight;
      }

      if (bo?.from) {
        const time = helpers.formatYear(bo?.from, bo?.to);
        doc.text(
          time,
          innerMargin + outerMargin,
          innerMargin + outerMargin + 5 + lineNumber
        );
        lineNumber += 1 * lineHeight;
      }

      if (bo?.description) {
        const clippedText = doc.splitTextToSize(
          reformatHtml(bo.description),
          width - (outerMargin + innerMargin) * 2 - lineHeight * 5 - innerMargin
        );
        doc.text(
          clippedText,
          innerMargin + outerMargin,
          innerMargin + outerMargin + 5 + lineNumber
        );
        lineNumber += clippedText.length * (lineHeight - 1);
      }

      lineNumber += extraOffset;
    }
  }

  doc.output(
    'dataurlnewwindow',
    new Date().toJSON().slice(0, 10) +
      '-' +
      'Curriculum_Vitae_Henrik_Beske' +
      '_' +
      locale +
      '.pdf'
  );
}

function generatePrintObject(list: any): PortfolioPrint {
  return {
    name: 'Henrik Beske',
    profession: 'Software Developer',
    address: '',
    postalCodeAndCity: '',
    country: 'Denmark',
    phoneNumber: '(+45) 24 49 75 55',
    eMail: 'henrikbeske@gmail.com',
    shortDescription: `I am a developer with a versatile profile and a broad knowledge outside a developer's typical field of activity.
    
As a person, I am calm and forthright. I am good at collaborating with others, and my focus is on solving the challenges that arise in everyday work. My approach to tasks contains both creative and analytical qualities.
    
I am passionate about developing complete solutions, which make a difference for people using them. In my world, software needs to be obvious and well thought out.
    
I am 41 years old, happily married, and have children aged between 12-21 years. During my leisure time, I perform i.a. board and leadership work in a local sports club as well as at a free school that my youngest child attends.
    
Additionally, I collect coins, play old computer games, code on my hobby projects and read books. I am a distinct knowledge collector and constantly like to build upon my knowledge.`,
    listItems: list,
  } as PortfolioPrint;
}

function reformatHtml(text: string): string {
  if (!text) {
    return '';
  }

  const removers = ['<p>', '<ul>', '</ul>'];
  const lineBreakers = ['</p>', '</li>', '</br>'];
  const listItems = ['<li>'];

  while (text.includes('\t')) {
    text = text.replace('\t', '');
  }

  while (text.includes('\n')) {
    text = text.replace('\n', '');
  }

  for (const tag of removers) {
    while (text.includes(tag)) {
      text = text.replace(tag, '');
    }
  }

  for (const tag of lineBreakers) {
    while (text.includes(tag)) {
      text = text.replace(tag, '\n\n');
    }
  }

  for (const tag of listItems) {
    while (text.includes(tag)) {
      text = text.replace(tag, ' - ');
    }
  }

  return text;
}

interface PortfolioPrint {
  name: string;
  profession: string;
  address: string;
  postalCodeAndCity: string;
  country: string;
  phoneNumber: string;
  eMail: string;
  shortDescription: string;
  listItems: any;
}
