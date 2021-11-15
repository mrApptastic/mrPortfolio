import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearFormat'
})
export class YearFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}

  transform(fromDate: string, toDate: string) : any {
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
