import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardFormat'
})
export class CardFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? value.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/, '') : null;
  }

}
