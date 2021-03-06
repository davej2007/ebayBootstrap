import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../custom/directive/sortable.directive';

import { IAUCTION } from '../../custom/interface/auction';
import { IDISPLAYDATE } from '../../custom/interface/state';
import { STATUS, CATEGORIES } from '../../custom/defaultValues';
import { TotalsTableControlService } from '../../service/table-control-totals.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Months } from '../../custom/directive/fuctions';
import { AuctionService } from '../../service/auction.service';

@Component({
  selector: 'monthly-totals',
  templateUrl: './monthly-totals.component.html',
  styleUrls: ['./monthly-totals.component.css']
})
export class MonthlyTotalsComponent implements OnInit {

  Auctions$: Observable<IAUCTION[]>;
  total$: Observable<number>;
  grandTotal$: Observable<number>;

  constructor(
    public tableService: TotalsTableControlService,
    private activatedRoute:ActivatedRoute,
    public modalService: NgbModal,
    public _auction:AuctionService,
    public _Router:Router
    ) {
      this.Auctions$ = tableService.auctions$;
      this.total$ = tableService.total$;
      this.grandTotal$ = tableService.grandTotal$;
    }

  public StatusList   : any = STATUS;
  public CategoryList : any = CATEGORIES;
  public DisplayShow  : Array<IDISPLAYDATE>= [];
  // public display      : IDISPLAYDATE = { month: null, year: null }
  public MONTHS       : Array<string> = Months
  
  ngOnInit(): void {
    let date:Date = new Date();
    let currentmonth:number = date.getMonth();
    let currentyear:number = date.getUTCFullYear();
    this.tableService.displayDate = {month:currentmonth,year:currentyear}
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

  // onSort({column, direction}: SortEvent) {
  //   // resetting other headers
  //   this.headers.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });
  //   this.tableService.sortDirection = direction;
  // }
  checkDisplayDate(en:any){
    if(this.tableService.displayDate.month == en.month && this.tableService.displayDate.year == en.year){
      return true
    } else {
      return false
    }
  }
}