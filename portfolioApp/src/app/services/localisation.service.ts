import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  constructor() { }

  getLocale(): string {
    const baseUrl = window.location.href.split(window.location.host)[1];

    if (baseUrl.includes("/")) {
      const locale = baseUrl.split('/')[1].toLowerCase();

      switch (locale) {
        case "sv": return "sv-SE";
        case "en": return "en-GB";
        default: return "da-DK";

      }
    }

    return "da-DK";
  }
}
