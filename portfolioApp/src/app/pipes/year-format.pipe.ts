import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from '../services/time.service';

@Pipe({
  name: 'yearFormat'
})
export class YearFormatPipe implements PipeTransform {

  constructor(private time: TimeService){}

  transform(fromDate: string, toDate: string) : any {
    if (!fromDate || !toDate) {
      return "";
    }
   return this.time.formatYear(fromDate, toDate);
  }
}
