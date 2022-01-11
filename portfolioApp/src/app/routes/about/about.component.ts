import { Component, OnInit } from '@angular/core';
import { TypeSettings } from 'src/app/models/type-settings';
import { TypeWriterService } from 'src/app/services/type-writer.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  typeSettings = {
    text : new Array(
      $localize`:@@3848366393353229455:Til dagligt er jeg Henrik Beske, et helt almindeligt familiemenneske.`,
      $localize`:@@9041498226623547445:Men idet jeg tager afsted til arbejde, forvandler jeg mig til mrApptastic, en superheroisk webudvikler med gazelleblod fossende gennem blodbanerne.`
    ),
    speed : 20,
    index : 0,
    arrLength : 0,
    scrollAt : 20,
    textPos : 0,
    contents : '',
    row: 0
  } as TypeSettings;


  constructor(private type: TypeWriterService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.typeSettings.arrLength = this.typeSettings.text[0].length;
      this.type.typewriter(".typeBandit", this.typeSettings);
    }, 0);
  }
}
