import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br'
})
export class Nl2brPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? value.replace(new RegExp('\n', 'g'), "<br />") : null;
  }

}
