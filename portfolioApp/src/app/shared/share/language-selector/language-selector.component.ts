import { Component, Inject, LOCALE_ID, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LanguageSelectorComponent implements OnInit {
  languages = [
    { "name": $localize`:@@397497450705980813:Kontakt`, "language": "da", "country": "DK", "icon": "assets/images/flags/dk.svg", "nextUrl": "/en" },
    { "name": $localize`:@@397497450705980813:Kontakt`, "language": "en", "country": "GB", "icon": "assets/images/flags/gb.svg", "nextUrl": "/sv" },
    { "name": $localize`:@@397497450705980813:Kontakt`, "language": "sv", "country": "SE", "icon": "assets/images/flags/se.svg", "nextUrl": "/da" }
  ]
  currentLanguage: any = this.languages[0];

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    if (this.languages.some((x: any) => x.language === this.locale)) {
      this.currentLanguage = this.languages.find((x: any) => x.language === this.locale);
    }
  }

}
