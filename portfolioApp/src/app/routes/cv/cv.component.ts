import { Component, OnInit } from '@angular/core';
import { PortfolioList } from 'src/app/models/portfolio-list';
import { CvDataService } from 'src/app/services/cv.data.service';
import { CvExportService } from 'src/app/services/cv.export.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  errorState = false;
  language = "da";
  cvStuff: any;

  constructor(private data: CvDataService, private exp: CvExportService) {}

  ngOnInit(): void {
    this.getCvStuff(this.language);
  }

  getCvStuff(language: string): void {
    this.data.getPortfolioItems(language).subscribe(x => {
      this.cvStuff = x;
    }, e => {
      if (!environment.production) {
        console.log(e);
      }

      this.errorState = true;
    });
  }

  download(): void {
    this.exp.downloadCV();
  }

  handleNavBar(): void {
    const navBar = document.getElementById("myNavbar");
    const isCollasped = !navBar?.classList.contains("in");

    if (isCollasped) {
      navBar?.classList.add("in");
    } else {
      navBar?.classList.remove("in");
    }
  }

}
