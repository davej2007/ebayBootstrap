import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../service/auction.service';
import { IAUCTION } from '../../custom/interface/auction';
import { STATUS, CATEGORIES } from '../../custom/defaultValues';

@Component({
  selector: 'auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,    
    public _Auction:AuctionService) { }

  // Variables
  public processing:Boolean = false;
  public AUCTION : IAUCTION = null;
  public StatusList : any = STATUS;
  public CategoryList : any = CATEGORIES;
  

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
    data=>{
      if(data.info.success){
        this.AUCTION = data.info.auction;
        this.processing = true;
        console.log(this.AUCTION)
      } else {
        alert(data.message)
      }
    },
    err =>  {
      alert('Server Error : '+err.message+' If this continues Please contact Systems.');
    }
  )}

}
