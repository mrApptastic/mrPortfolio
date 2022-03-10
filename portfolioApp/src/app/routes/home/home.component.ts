import { Component, OnInit } from '@angular/core';
import { TypeWriterService } from 'src/app/services/type-writer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  texts = [
    $localize`:@@4648125905901114093:Hej med jer!`,
    $localize`:@@1778669046461046364:Velkommen til mit portfolio.`,
    $localize`:@@1998905985795636231:Tag et kig eller to og se jer lidt omkring.`,
    $localize`:@@6259912308629379993:Jeg er nemlig ikke ligesom de andre udviklere.`
  ];

  constructor(private type: TypeWriterService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.type.typewriter(".elevatorSpeech", {
        text : this.texts,
        speed : 20,
        index : 0,
        arrLength : this.texts[0].length,
        scrollAt : 20,
        textPos : 0,
        contents : '',
        row: 0
      });
    }, 0);
  }
}
