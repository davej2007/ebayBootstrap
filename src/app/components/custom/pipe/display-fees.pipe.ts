import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayFees'
})
export class DisplayFeesPipe implements PipeTransform {

  transform(value: any): unknown {
    let output = ''
    if(value.finalFee.set) output = 'EB:'+ this.dd(value.finalFee.cost)
    if(value.postageFee.set) output = output + ' - PE:' + this.dd(value.postageFee.cost)
    if(value.paypalFee.set) output = output + ' - PP:' + this.dd(value.paypalFee.cost)
      
    return output;
  }

  dd = function (value:number):string {
    let output:string = 'na';
    if (value !== null && value !=0 ) output = '£'+value.toFixed(2).toString()
    return output;
  }
    

//   finalFee:
// cost: null
// promo: false
// set: true
// __proto__: Object
// postageFee: {cost: null, set: true}
// paypalFee: {cost: null, set: false}

}
