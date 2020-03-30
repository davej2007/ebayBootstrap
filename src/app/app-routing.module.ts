import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { AuctionInfoService } from './components/resolver/auction-info.service';
import { AuctionTableComponent } from './components/pages/1-auction-table/auction-table.component';
import { SoldTableComponent } from './components/pages/2-sold-table/sold-table.component';


const routes: Routes = [ 
  { path: '',   component: AuctionTableComponent, data: {status: [1,0]}, resolve:{info:AuctionInfoService}  },
  { path: 'sold',   component: SoldTableComponent, data: {status: [2,3,4,5,6]}, resolve:{info:AuctionInfoService}  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }