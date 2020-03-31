import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuctionService } from 'src/app/components/service/auction.service';


@Component({
  selector: 'fees-modal-content',
  templateUrl: `./fees.html`,
  styleUrls: ['../modal.css']
})
export class FeesModalContent implements OnInit {
  @Input() id:String;
  @Input() description:String;
  @Input() final:number;
  @Input() postage:number;
  @Input() paypal:number;
  constructor(
    public activeModal: NgbActiveModal,
    private fb:FormBuilder,
    public _Auction:AuctionService) {}
// form Get
get finalFee()  { return this.FeeForm.get('finalFee');   }
get postageFee()   { return this.FeeForm.get('postageFee');   }
get paypalFee()  { return this.FeeForm.get('paypalFee');   }

ngOnInit(){
    if(this.final>0) this.finalFee.setValue(this.final);
    if(this.postage>0) this.postageFee.setValue(this.postage);
    if(this.paypal>0) this.paypalFee.setValue(this.paypal);
}
// Variables
public errorMsg:String = '';
public successMsg:String = '';
public processing:Boolean = false;

// Form Definition
FeeForm = this.fb.group({
  finalFee:[ null, [Validators.required]],
  postageFee: [ null],
  paypalFee :[ null ]
})
disableForm(){    
  this.processing = true;
  this.finalFee.disable();
  this.postageFee.disable();
  this.paypalFee.disable();
}
enableForm(){
  this.processing = false;
  this.finalFee.enable();
  this.postageFee.enable();
  this.paypalFee.enable();
}
submit(FeeDetails:any){
  this.disableForm();
  let feeAuctionData = {
    id : this.id,
    finalFee : FeeDetails.finalFee,
    postageFee : FeeDetails.postageFee,
    paypalFee : FeeDetails.paypalFee
  }
  this._Auction.updateFeesAuction(feeAuctionData).subscribe(
    data => {
      if(!data.success){
        this.disableForm()
        this.errorMsg = data.message;
        setTimeout(()=>{
          this.errorMsg = '';
          this.enableForm();
        }, 2000);
      } else {
        this.successMsg='Auction Fee Updated : '+data.auction.auction.description;
        setTimeout(()=>{
          this.successMsg = '';
          this.activeModal.close(data);
        }, 2000);
      }
    },
    err => {
      alert('Server Error : '+err.message+' If this continues Please contact Systems.');
      this.enableForm();
    }
  )
}
}