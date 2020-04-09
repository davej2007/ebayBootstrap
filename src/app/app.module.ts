import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { NgbdSortableHeader } from './components/custom/directive/sortable.directive';
// pages
import { NavbarComponent } from './components/pages/0-navbar/navbar.component';
import { AuctionTableComponent } from './components/pages/1-auction-table/auction-table.component';
import { SoldTableComponent } from './components/pages/2-sold-table/sold-table.component';
import { EbayFeesComponent } from './components/pages/3-ebay-fees/ebay-fees.component';
import { PaypalFeesComponent } from './components/pages/4-paypal-fees/paypal-fees.component';
import { AuctionDetailComponent } from './components/pages/7-auction-detail/auction-detail.component';
import { EditAuctionComponent } from './components/pages/8-edit-auction/edit-auction.component';
import { PageNotFoundComponent } from './components/pages/9-page-not-found/page-not-found.component';
// pipes
import { DisplayDatePipe } from './components/custom/pipe/display-date.pipe';
import { DisplayPoundsPipe } from './components/custom/pipe/display-pounds.pipe';
import { DisplayWeightPipe } from './components/custom/pipe/display-weight.pipe';
import { FirstLastDatePipe } from './components/custom/pipe/first-last-date.pipe';
// modals
import { NewAuctionModalContent } from './components/pages/1-auction-table/MODALS/0-NewAuction/newAuction';
import { UnSoldModalContent } from './components/pages/1-auction-table/MODALS/1-UnSold/unSold';
import { SoldModalContent } from './components/pages/1-auction-table/MODALS/2-Sold/sold';
import { PaidModalContent } from './components/pages/2-sold-table/MODALS/3-Paid/paid';
import { PostModalContent } from './components/pages/2-sold-table/MODALS/4-Post/post';
import { DeliveryModalContent } from './components/pages/2-sold-table/MODALS/5-Delivery/delivery';
import { DisplayFeesPipe } from './components/custom/pipe/display-fees.pipe';
import { DisplayTotalIncomePipe } from './components/custom/pipe/display-total-income.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NgbdSortableHeader,
    NavbarComponent,
    AuctionTableComponent,
      NewAuctionModalContent,
      UnSoldModalContent,
      SoldModalContent,
    SoldTableComponent,
      PaidModalContent,
      PostModalContent,
      DeliveryModalContent,
    EbayFeesComponent,
    PaypalFeesComponent,
    AuctionDetailComponent,
    EditAuctionComponent, 
    PageNotFoundComponent,
    // pipes
    DisplayPoundsPipe,
    FirstLastDatePipe,
    DisplayDatePipe,
    DisplayWeightPipe,
    DisplayFeesPipe,
    DisplayTotalIncomePipe,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule, // HTTP client
    FormsModule, ReactiveFormsModule, // Forms
  ],
  entryComponents: [
    NewAuctionModalContent,
    UnSoldModalContent,
    SoldModalContent,
    PaidModalContent,
    PostModalContent,
    DeliveryModalContent
  ],
  providers: [ 
    DecimalPipe,
    DisplayPoundsPipe,
    FirstLastDatePipe,
    DisplayDatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
