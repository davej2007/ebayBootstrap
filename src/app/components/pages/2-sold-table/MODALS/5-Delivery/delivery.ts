import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { AuctionService } from 'src/app/components/service/auction.service';

@Component({
  selector: 'delivery-modal-content',
  templateUrl: `./delivery.html`,
  styleUrls: ['../modal.css']
})
export class DeliveryModalContent implements OnInit {
  @Input() id:String;
  @Input() description:String;
  constructor(
    public activeModal: NgbActiveModal,
    private fb:FormBuilder,
    public _Auction:AuctionService) {}
  // form Get
  get date()  { return this.DeliveredForm.get('date');   }

  ngOnInit(){}
  // Variables
  public errorMsg:String = '';
  public successMsg:String = '';
  public processing:Boolean = false;

  // Form Definition
  DeliveredForm = this.fb.group({
    date:['', [Validators.required]]
  })
  disableForm(){    
    this.processing = true;
    this.date.disable();
  }
  enableForm(){
    this.processing = false;
    this.date.enable();
  }
  submit(DeliveryDetails:any){
    this.disableForm();
    let deliveryData = {
      id : this.id,
      date:Date.parse(DeliveryDetails.date)
    }
    this._Auction.updateDeliveredAuction(deliveryData).subscribe(
      data => {
        if(!data.success){
          this.disableForm()
          this.errorMsg = data.message;
          setTimeout(()=>{
            this.errorMsg = '';
            this.enableForm();
          }, 2000);
        } else {
          this.successMsg='Auction Updated : '+data.auction.auction.description;
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