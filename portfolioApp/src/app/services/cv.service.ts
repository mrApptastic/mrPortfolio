import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

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

    doc.text("Hej lille tulipan", 10, 10);
    doc.save("Uha.pdf");
  }
}
