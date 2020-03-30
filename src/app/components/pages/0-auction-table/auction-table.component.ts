import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../custom/directive/sortable.directive';

import { IAUCTION } from '../../custom/interface/auction';
import { TableControlService } from '../../service/table-control.service';
import { STATUS, CATEGORIES } from '../../custom/defaultValues';

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
    public tableService: TableControlService,
    private activatedRoute:ActivatedRoute) {
      this.Auctions$ = tableService.auctions$;
      this.total$ = tableService.total$;
    }

  public StatusList : any = STATUS;
  public CategoryList : any = CATEGORIES;
  public StatusShow : [Number] ;
  public display : {month:number, year:number} = {month:null, year:null}
  public category :Number;
  public status :[Number];

  ngOnInit(){
    this.activatedRoute.data.subscribe(
      data=>{
        this.StatusShow = data.status;
        this.status=this.StatusShow
        if(data.info.success){
          this.tableService.AUCTIONS = data.info.auctions;
        } else {
          console.log(data)
        }
      },
      err =>{
        console.log(err)
      }
    )
  }

  onSort({direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      {
        header.direction = 'desc';
      }
    });

    this.tableService.sortDirection = direction;
  }
}