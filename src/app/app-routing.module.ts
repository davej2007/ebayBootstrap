import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { AuctionInfoService } from './components/resolver/auction-info.service';
import { AuctionTableComponent } from './components/pages/0-auction-table/auction-table.component';


const routes: Routes = [ 
  { path: '',   component: AuctionTableComponent, data: {status: [1,0,2,3,4,5]}, resolve:{info:AuctionInfoService}  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }