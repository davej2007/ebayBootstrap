import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { DisplayPoundsPipe } from './components/custom/pipe/display-pounds.pipe';
import { LastDatePipe } from './components/custom/pipe/display-date.pipe';
import { DecimalPipe } from '@angular/common';
import { NgbdSortableHeader } from './components/custom/directive/sortable.directive';
import { NavbarComponent } from './components/pages/0-navbar/navbar.component';
import { AuctionTableComponent } from './components/pages/1-auction-table/auction-table.component';
import { SoldTableComponent } from './components/pages/2-sold-table/sold-table.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DisplayPoundsPipe,
    LastDatePipe,
    AuctionTableComponent,
    NgbdSortableHeader,
    NavbarComponent,
    SoldTableComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule, // HTTP client
    FormsModule, ReactiveFormsModule, // Forms
  ],
  providers: [ DecimalPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
