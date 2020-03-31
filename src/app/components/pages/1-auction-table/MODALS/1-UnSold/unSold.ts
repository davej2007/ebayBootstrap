import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuctionService } from 'src/app/components/service/auction.service';

@Component({
  selector: 'unSold-modal-content',
  templateUrl: `./unSold.html`,
  styleUrls: ['../modal.css']
})

export class UnSoldModalContent {
  @Input() id:String;
  @Input() description:String;
  constructor(
    public activeModal: NgbActiveModal,
    public auction:AuctionService) {}
  // Variables
    public errorMsg:String = '';
    public successMsg:String = '';
    public processing:Boolean = false;
    public dateListed:string;

  relist(date:string){
    this.auction.updateReListByID(this.id, date ).subscribe(
      data => {
        if(!data.success){
          this.processing = true;
          this.errorMsg = data.message;
          setTimeout(()=>{
            this.errorMsg = '';
            this.processing = false;
          }, 2000);
        } else {
          this.successMsg='Auction Updated: '+data.auction.auction.description;
          setTimeout(()=>{
            this.successMsg = '';
            this.activeModal.close(data);
          }, 2000);
        }
      },
      err => {
        alert('Server Error : '+err.message+' If this continues Please contact Systems.');
        this.processing = false;
      }
    )
  }
}