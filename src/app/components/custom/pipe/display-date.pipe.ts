import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastDate'
})
export class LastDatePipe implements PipeTransform {
  public MONTHS :any =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  
  transform(value: [number]): unknown {
    let firstDate:any = new Date(value[0])
    let length = value.length
    let lastDate:any = new Date(value[length-1])
    let output = firstDate.getDate().toString()+' '+this.MONTHS[firstDate.getMonth()]+' '+firstDate.getFullYear().toString()
    .slice(-2);
    if (length >1) output =output +'..'+ lastDate.getDate().toString()+' '+this.MONTHS[lastDate.getMonth()]+' '+lastDate.getFullYear().toString()
    .slice(-2);
    return output


    
  }

}
