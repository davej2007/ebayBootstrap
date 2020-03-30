import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(public _HTTP:HttpClient) { }

  getAuctionDetails(){
    return this._HTTP.get<any>(environment.apiAuctions+'/test');
  }
}
