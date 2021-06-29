import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timetable'
})
export class TimetablePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if (!value) return;
    return value.substring(0, 2) + ':' + value.substring(2, 4) + 'H';
  }

}
