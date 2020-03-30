import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../custom/directive/sortable.directive';

import { IAUCTION } from '../../custom/interface/auction';
import { STATUS, CATEGORIES } from '../../custom/defaultValues';
import { SoldTableControlService } from '../../service/sold-table-control.service';

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
    private activatedRoute:ActivatedRoute) {
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
        console.log(data)
        this.StatusShow = data.status;
        this.tableService.status=this.StatusShow
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
}