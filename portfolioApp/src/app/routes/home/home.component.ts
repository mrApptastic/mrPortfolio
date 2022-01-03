import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.animatePath("animPath", 0.02);
    }, 0);
  }

  animatePath (cl: string, dl: number): void {
		for (let i = 0; i < document.getElementsByClassName(cl).length;i++) {
			 const thisPath = document.getElementsByClassName(cl)[i] as SVGPathElement;
			 const l = thisPath.getTotalLength();
			 thisPath.style.strokeDasharray = l.toString();
			 thisPath.style.strokeDashoffset = l.toString();;
			 thisPath.style.opacity = (1).toString();
			 thisPath.style.animation = "dash " + dl + "s linear forwards, toBlack " + (dl * 2) + "s linear forwards";
			 thisPath.style.animationDelay = (i * dl) + "s";
		}

    const totalTime = ((document.getElementsByClassName(cl).length * dl) * 1000) + 200;

		setTimeout(() => {
      document.getElementById("navigation")?.classList.remove("hidden");
		}, totalTime);
	};
}
