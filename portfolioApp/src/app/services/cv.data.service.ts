import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioList } from '../models/portfolio-list';

@Injectable({
  providedIn: 'root'
})
export class CvDataService {

  constructor(private http: HttpClient) { }

  getPortfolioItems(language: string): Observable<PortfolioList> {
    return this.http.get<PortfolioList>("http://portfolio.tesj.dk/api/portfolio/getall/" + language);
  }
}
