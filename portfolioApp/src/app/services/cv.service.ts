import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Lato } from './lato';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor() { }

  downloadCV(): void {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    // doc.addFont('Ringbearer', '', 'normal');
    // doc.setFont('Courier');
    var img = new Image()
    // img.src = "assets/images/Himself.png";
    // doc.addImage(img, 'png', 10, 78, 12, 15);

    jsPDF.API.events.push(['addFonts', function() {
      // doc.addFileToVFS('Lato-Regular-normal.ttf', Lato);
      // doc.addFont('Lato-Regular-normal.ttf', 'Lato-Regular', 'normal');
    }]);
    doc.setFont('Courier');
    doc.text("Hej lille tulipan", 10, 10);
    doc.save("Uha.pdf");
  }
}
