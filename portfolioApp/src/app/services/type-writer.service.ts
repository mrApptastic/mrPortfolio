import { Injectable } from '@angular/core';
import { TypeSettings } from '../models/type-settings';

@Injectable({
  providedIn: 'root'
})
export class TypeWriterService {

  constructor() { }

  typewriter(elem: string, typeSettings: TypeSettings) : void
  {
   const type = this;
   typeSettings.contents =  ' ';
   typeSettings.row = Math.max(0, typeSettings.index -typeSettings.scrollAt);
   const destination = document.querySelector(elem);

   if (destination) {
    while ( typeSettings.row < typeSettings.index ) {
      typeSettings.contents += typeSettings.text[typeSettings.row++] + '<br /><br />';
     }

     destination.innerHTML = typeSettings.contents + typeSettings.text[typeSettings.index].substring(0, typeSettings.textPos);
     if ( typeSettings.textPos++ === typeSettings.arrLength ) {
      typeSettings.textPos = 0;
      typeSettings.index++;
      if ( typeSettings.index !== typeSettings.text.length ) {
        typeSettings.arrLength = typeSettings.text[typeSettings.index].length;
        setTimeout(() => {
          type.typewriter(elem, typeSettings);
        }, 20);
      }
     } else {
      setTimeout(() => {
        type.typewriter(elem, typeSettings);
      }, typeSettings.speed);
     }
   }


  };
}
