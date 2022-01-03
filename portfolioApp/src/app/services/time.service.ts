import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private datePipe: DatePipe){}

  formatYear(fromDate: string, toDate: string) : any {
    if (!fromDate || !toDate) {
      return "";
    }
   return this.datePipe.transform(fromDate, "yyyy") + (this.checkDate(fromDate, toDate) ? "-" + (!this.futureCheck(toDate) ? "pt." : this.datePipe.transform(toDate, "yyyy")) : "");
  }

  private checkDate(dateFrom: string, dateTo: string): boolean {
    if (new Date(dateFrom).getFullYear() === (new Date(dateTo).getFullYear())) {
      return false;
    } else {
      return true;
    }
  }

  private futureCheck( dateTo: string): boolean {
    return (new Date(dateTo) < new Date());
  }
}
