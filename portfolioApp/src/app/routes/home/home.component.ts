import { Component, OnInit } from '@angular/core';
import { TypeWriterService } from 'src/app/services/type-writer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  texts = [
    "Hej med jer!",
    "Velkommen til mit portfolio.",
    "Tag et kig eller to og ser jer lidt omkring.",
    "Jeg er nemlig ikke ligesom de andre udviklere."
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
