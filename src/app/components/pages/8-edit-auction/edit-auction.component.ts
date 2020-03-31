import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../service/auction.service';
import { IAUCTION } from '../../custom/interface/auction';
import { STATUS, CATEGORIES } from '../../custom/defaultValues';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'edit-auction',
  templateUrl: './edit-auction.component.html',
  styleUrls: ['./edit-auction.component.css']
})
export class EditAuctionComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder,   
    public _Auction:AuctionService) { }

  // Variables  
  public errorMsg:String = null;
  public successMsg:String = null;
  public processing:Boolean = false;
  public AUCTION : IAUCTION = null;
  public StatusList : any = STATUS;
  public CategoryList : any = CATEGORIES;
  public page:number = 0;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
    data=>{
      if(data.info.success){
        this.AUCTION = data.info.auction;
        this.description.setValue(this.AUCTION.auction.description);
        this.initialPrice.setValue(this.AUCTION.auction.initialPrice);
        this.postagePaid.setValue(this.AUCTION.auction.postage);
        this.weight.setValue(this.AUCTION.auction.weight);
        this.category.setValue(this.AUCTION.category);
        console.log(this.AUCTION)
      } else {
        alert(data.message)
      }
    },
    err =>  {
      alert('Server Error : '+err.message+' If this continues Please contact Systems.');
    }
  )}
  // Form Definition
  auctionDetailsForm = this.fb.group({
    // dateListed: [null, [Validators.required]],
    description:['', [Validators.required]],
    initialPrice:[null, [Validators.required]],
    category:[null, [Validators.required]],
    postagePaid:[null, [Validators.required]],
    weight:[null, [Validators.required]]
  })
  // form Get
  // get dateListed()      { return this.auctionDetailsForm.get('dateListed');   }
  get description()     { return this.auctionDetailsForm.get('description');   }
  get initialPrice()    { return this.auctionDetailsForm.get('initialPrice');   }
  get category()        { return this.auctionDetailsForm.get('category');   }
  get postagePaid()     { return this.auctionDetailsForm.get('postagePaid');   }
  get weight()          { return this.auctionDetailsForm.get('weight');   }
  
  // Form Definition
  buyerDetailsForm = this.fb.group({
    dateListed: [null, [Validators.required]],
    description:['', [Validators.required]],
    initialPrice:[null, [Validators.required]],
    category:[null, [Validators.required]],
    postagePaid:[null, [Validators.required]],
    weight:[null, [Validators.required]]
  })
  // Form Definition
  courierDetailsForm = this.fb.group({
    dateListed: [null, [Validators.required]],
    description:['', [Validators.required]],
    initialPrice:[null, [Validators.required]],
    category:[null, [Validators.required]],
    postagePaid:[null, [Validators.required]],
    weight:[null, [Validators.required]]
  })
  // Form Definition
  feesDetailsForm = this.fb.group({
    dateListed: [null, [Validators.required]],
    description:['', [Validators.required]],
    initialPrice:[null, [Validators.required]],
    category:[null, [Validators.required]],
    postagePaid:[null, [Validators.required]],
    weight:[null, [Validators.required]]
  })
  cancel(){
    console.log('cancel pressed')
  }
  submitAuctionDetails(data:any){
    console.log(data);
  }
}