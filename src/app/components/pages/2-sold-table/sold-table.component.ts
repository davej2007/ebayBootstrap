import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../custom/directive/sortable.directive';

import { IAUCTION } from '../../custom/interface/auction';
import { IDISPLAYDATE } from '../../custom/interface/state';
import { STATUS, CATEGORIES } from '../../custom/defaultValues';
import { SoldTableControlService } from '../../service/sold-table-control.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuctionService } from '../../service/auction.service';
import { PaidModalContent } from './MODALS/3-Paid/paid';
import { PostModalContent } from './MODALS/4-Post/post';
import { DeliveryModalContent } from './MODALS/5-Delivery/delivery';

@Component({
  selector: 'sold-table',
  templateUrl: './sold-table.component.html',
  styleUrls: ['./sold-table.component.css']
})
export class SoldTableComponent implements OnInit {

  Auctions$: Observable<IAUCTION[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public tableService: SoldTableControlService,
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
        this.StatusShow = data.status;
        this.tableService.status=this.StatusShow
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
  checkStatusActive(st:any){
    if(this.tableService.status.length==1 && this.tableService.status[0] != st) {
      return false
    } else if(this.tableService.status.length>1 && st!=-1) {
      return false
    } else {
      return true
    }
  }
  checkDisplayDate(en:any){
    if(this.tableService.displayDate.month == en.month && this.tableService.displayDate.year == en.year){
      return true
    } else {
      return false
    }
  }
  // Modal Buttons
  openPaid(auction:IAUCTION){
    console.log(auction._id);
    const modalRef = this.modalService.open(PaidModalContent, {backdrop:'static'});
    modalRef.componentInstance.id = auction._id;
    modalRef.componentInstance.description = auction.auction.description;
    modalRef.componentInstance.buyerName = auction.sold.buyer.name;
    modalRef.componentInstance.buyerPostCode = auction.sold.buyer.postCode;
    modalRef.result.then(
      res => {
        if(res.success){
          this.reloadTableData()
        } else {
          console.log('Error from Modal : ', res)
        }
      }
    );
  }
  openPost(auction:IAUCTION){
    const modalRef = this.modalService.open(PostModalContent, {backdrop:'static'});
    modalRef.componentInstance.id = auction._id;
    modalRef.componentInstance.description = auction.auction.description;
    modalRef.componentInstance.method = auction.courier.company;
    modalRef.componentInstance.buyerName = auction.sold.buyer.name;
    modalRef.componentInstance.buyerPostCode = auction.sold.buyer.postCode;
    modalRef.result.then(
      res => {
        if(res.success){
          this.reloadTableData()
        } else {
          console.log('Error from Modal : ', res)
        }
      }
    );
  }
  openDelivery(auction:IAUCTION){
    console.log(auction._id);
    const modalRef = this.modalService.open(DeliveryModalContent, {backdrop:'static'});
    modalRef.componentInstance.id = auction._id;
    modalRef.componentInstance.description = auction.auction.description;
    modalRef.componentInstance.company = auction.courier.company;
    modalRef.componentInstance.trackingNo = auction.courier.trackingNo;
    modalRef.componentInstance.dateSold = auction.sold.dateSold;
    modalRef.result.then(
      res => {
        if(res.success){
          this.reloadTableData()
        } else {
          console.log('Error from Modal : ', res)
        }
      }
    );
  }
  reloadTableData(){
    let old:number = this.tableService.category;
    this._auction.getAuctionDetails().subscribe(
      data=>{
        if(data.success){
          this.tableService.category = undefined;
          this.tableService.AUCTIONS = data.auctions;
          this.tableService.category = old;
          this.tableService.searchTerm = '';
        } else {
          console.log(data.message)
        }
      },
      err=>{console.log(err)}
      )
  }
}