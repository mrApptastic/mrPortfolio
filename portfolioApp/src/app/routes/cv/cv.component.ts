import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  download(): void {

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.text("Hej lille tulipan", 10, 10);
    doc.save("Uha.pdf");
  }

}
