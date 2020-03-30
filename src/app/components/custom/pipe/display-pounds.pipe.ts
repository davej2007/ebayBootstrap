import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayPounds'
})
export class DisplayPoundsPipe implements PipeTransform {

  transform(value: number): string {
    let output : string = 'N/A'
    if (value !== null && value !=0 ) output =value.toFixed(2).toString()
    return output;
  }

}
