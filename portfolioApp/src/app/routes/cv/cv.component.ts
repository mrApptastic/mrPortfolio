import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  language = "da";
  cvStuff: any;

  constructor(private http: HttpClient, private cvService: CvService) { }

  ngOnInit(): void {
    this.getCvStuff(this.language);
  }

  getCvStuff(language: string): void {
    this.http.get("https://portfolio.tesj.dk/api/portfolio/getall/" + language).subscribe(x => {
      this.cvStuff = x;
    }, e => {

    });
  }

  download(): void {
    this.cvService.downloadCV();
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
