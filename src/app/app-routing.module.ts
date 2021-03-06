import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuctionInfoService } from './components/resolver/auction-info.service';
import { AuctionTableComponent } from './components/pages/1-auction-table/auction-table.component';
import { SoldTableComponent } from './components/pages/2-sold-table/sold-table.component';
import { AuctionDetailComponent } from './components/pages/7-auction-detail/auction-detail.component';
import { PageNotFoundComponent } from './components/pages/9-page-not-found/page-not-found.component';
import { AuctionDetailService } from './components/resolver/auction-details.service';
import { EditAuctionComponent } from './components/pages/8-edit-auction/edit-auction.component';
import { EbayFeesComponent } from './components/pages/3-ebay-fees/ebay-fees.component';
import { PaypalFeesComponent } from './components/pages/4-paypal-fees/paypal-fees.component';
import { ConfirmDeliveryComponent } from './components/pages/5-confirm-delivery/confirm-delivery.component';
import { MonthlyTotalsComponent } from './components/pages/6-monthly-totals/monthly-totals.component';
import { AuctionUnDeliveredService } from './components/resolver/auction-un-delivered.service';
import { AuctionSoldService } from './components/resolver/auction-sold.service';

const routes: Routes = [
  {path:'active',       component: AuctionTableComponent,
                        data: {status: [1,0]},
                        resolve:{info:AuctionInfoService}  },
  {path:'sold',         component: SoldTableComponent,
                        data: {status: [2,3,4,5]},
                        resolve:{info:AuctionInfoService}  },
  {path:'details/:id',  component:AuctionDetailComponent,
                        resolve:{info:AuctionDetailService}},
  {path:'edit/:id',     component:EditAuctionComponent,
                        resolve:{info:AuctionDetailService}},
  {path:'ebayFees',     component:EbayFeesComponent},
  {path:'paypalFees',   component:PaypalFeesComponent},
  {path:'confirmDel',   component:ConfirmDeliveryComponent,
                        resolve:{info:AuctionUnDeliveredService}},
  {path:'monthlyTotals',  component:MonthlyTotalsComponent,
                          resolve:{info:AuctionSoldService}},
  { path: '',
    redirectTo: '/active',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }