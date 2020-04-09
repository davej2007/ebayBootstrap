import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader, SortEvent } from '../../custom/directive/sortable.directive';

import { STATUS, CATEGORIES } from '../../custom/defaultValues';
import { IAUCTION } from '../../custom/interface/auction';
import { AuctionTableControlService } from '../../service/auction-table-control.service';
import { AuctionService } from '../../service/auction.service';
import { NewAuctionModalContent } from './MODALS/0-NewAuction/newAuction';
import { UnSoldModalContent } from './MODALS/1-UnSold/unSold';
import { SoldModalContent } from './MODALS/2-Sold/sold';

@Component({
  selector: 'auctionTable',
  templateUrl: './auction-table.component.html',
  styleUrls: ['./auction-table.component.css']
})
export class AuctionTableComponent implements OnInit{

  Auctions$: Observable<IAUCTION[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public  tableService: AuctionTableControlService,
    private activatedRoute:ActivatedRoute,
    public modalService: NgbModal,
    public _auction:AuctionService,
    public _Router:Router
    ) {
      this.Auctions$ = tableService.auctions$;
      this.total$ = tableService.total$;
    }

  public StatusList : any = STATUS;
  public CategoryList : any = CATEGORIES;
  public StatusShow : [number];
  public display : {month:number, year:number} = {month:null, year:null}

  ngOnInit(){
    this.activatedRoute.data.subscribe(
      data=>{
        this.StatusShow = data.status;
        this.tableService.status=this.StatusShow
        if(data.info.success){
          this.tableService.AUCTIONS = data.info.auctions;
        } else {
          alert(data.message)
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

    // this.tableService.sortColumn = column;
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
  // Modal Buttons
  openUnsold(auction:IAUCTION){
    const modalRef = this.modalService.open(UnSoldModalContent, {backdrop:'static'});
    modalRef.componentInstance.id = auction._id;
    modalRef.componentInstance.description = auction.auction.description;
    modalRef.componentInstance.lastDateListed = auction.auction.dateListed[auction.auction.dateListed.length-1];
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
  openNewAuction() {
    this.modalService.open(NewAuctionModalContent, {backdrop:'static', size: 'xl'}).result.then(
      res => {
        console.log(res)
        if(res.success){
          this.reloadTableData()
        } else {
          console.log('Error from Modal : ', res)
        }
      },
      reason => { console.log('Create Cancelled.') }
    );
  }
  openSold(auction:IAUCTION){
    const modalRef = this.modalService.open(SoldModalContent, {backdrop:'static'});
    modalRef.componentInstance.id = auction._id;
    modalRef.componentInstance.lastDateListed = auction.auction.dateListed[auction.auction.dateListed.length-1];
    modalRef.componentInstance.description = auction.auction.description;
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