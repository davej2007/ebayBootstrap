import { Pipe, PipeTransform } from '@angular/core';
import { IAUCTION } from '../interface/auction';
@Pipe({
  name: 'displayTotalIncome'
})
export class DisplayTotalIncomePipe implements PipeTransform {

  transform(value: IAUCTION): string {
    console.log(value.fee)
    let soldFor = value.sold.price
    let postagePaid=value.paid.postage;
    if(postagePaid==0 && value.courier.company==null) return 'Needs Payment';
    let courierCost = value.courier.cost;
    if(courierCost==0 && value.courier.company!='Collect') return 'Needs Courier'
    console.log(value.fee)
    if(!value.fee.finalFee.completed) return 'Ebay Fees'
    let ebayFee = value.fee.finalFee.cost;
    if(!value.fee.postageFee.completed) return 'Ebay Postage'
    let postageFee = value.fee.postageFee.cost;    
    if(!value.fee.paypalFee.completed) return 'PayPal Fee'
    let paypalFee = value.fee.paypalFee.cost;
    console.log(soldFor, postagePaid, courierCost)
    console.log(ebayFee, postageFee, paypalFee)
    let total = soldFor + postagePaid - courierCost - ebayFee - postageFee - paypalFee
    return '£ '+total.toFixed(2).toString();
  }

}
