import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../custom/directive/sortable.directive';

import { IAUCTION } from '../../custom/interface/auction';
import { IDISPLAYDATE } from '../../custom/interface/state';
import { STATUS, CATEGORIES } from '../../custom/defaultValues';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuctionService } from '../../service/auction.service';
import { DeliveryTableControlService } from '../../service/delivery-table-control.service';

@Component({
  selector: 'confirm-delivery',
  templateUrl: './confirm-delivery.component.html',
  styleUrls: ['./confirm-delivery.component.css']
})
export class ConfirmDeliveryComponent implements OnInit {

  Auctions$: Observable<IAUCTION[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public tableService: DeliveryTableControlService,
    private activatedRoute:ActivatedRoute,
    public modalService: NgbModal,
    public _auction:AuctionService,
    public _Router:Router
    ) {
      this.Auctions$ = tableService.auctions$;
      this.total$ = tableService.total$;
    }

  public StatusList   : any = STATUS;
  public CategoryList : any = CATEGORIES;
  public StatusShow   : Array<number>;
  public DisplayShow  : Array<IDISPLAYDATE>= [];
  public display      : IDISPLAYDATE = { month: null, year: null }
  public MONTHS       : Array<string> = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  
  ngOnInit(): void {
    let date:Date = new Date();
    let currentmonth:number = date.getMonth();
    let currentyear:number = date.getUTCFullYear();
    let y:number= 2019;
    let m:number = 10;
    while ( currentyear>y || currentmonth>=m ) {
      this.DisplayShow.push({month:m,year:y});
      if(m==11){
        m=0;y++
      } else {
        m++
      }
    }
    this.activatedRoute.data.subscribe(
      data=>{
        console.log(data)
        if(data.info.success){
          this.tableService.AUCTIONS = data.info.auctions;
        } else {
          console.log(data.message)
        }
      },
      err =>  {
        alert('Server Error : '+err.message+' If this continues Please contact Systems.');
      }
    )
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.tableService.sortDirection = direction;
  }
  checkDisplayDate(en:any){
    if(this.tableService.displayDate.month == en.month && this.tableService.displayDate.year == en.year){
      return true
    } else {
      return false
    }
  }
}