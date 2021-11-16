import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  typeSettings: any = {
    text : new Array(
      "Til dagligt er jeg Henrik Beske, et helt almindeligt familiemenneske.",
      "Men idet jeg tager afsted til arbejde, forvandler jeg mig til mrApptastic, en superheroisk webudvikler med gazelleblod fossende gennem blodbanerne."
    ),
    speed : 20,
    index : 0,
    arrLength : 0,
    scrollAt : 20,
    textPos : 0,
    contents : '',
    row : 0
  };


  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.typeSettings.arrLength = this.typeSettings.text[0].length;
      this.typewriter(".typeBandit");
    }, 0);
  }


  typewriter(elem: string) : void
  {
    console.log(this.typeSettings);
   const type = this;
   this.typeSettings.contents =  ' ';
   this.typeSettings.row = Math.max(0, this.typeSettings.index -this.typeSettings.scrollAt);
   const destination = document.querySelector(elem);

   if (destination) {
    while ( this.typeSettings.row < this.typeSettings.index ) {
      this.typeSettings.contents += this.typeSettings.text[this.typeSettings.row++] + '<br /><br />';
     }

     destination.innerHTML = this.typeSettings.contents + this.typeSettings.text[this.typeSettings.index].substring(0, this.typeSettings.textPos);
     if ( this.typeSettings.textPos++ === this.typeSettings.arrLength ) {
      this.typeSettings.textPos = 0;
      this.typeSettings.index++;
      if ( this.typeSettings.index !== this.typeSettings.text.length ) {
        this.typeSettings.arrLength = this.typeSettings.text[this.typeSettings.index].length;
        setTimeout(() => {
          type.typewriter(elem);
        }, 20);
      }
     } else {
      setTimeout(() => {
        type.typewriter(elem);
      }, this.typeSettings.speed);
     }
   }


  };






}
