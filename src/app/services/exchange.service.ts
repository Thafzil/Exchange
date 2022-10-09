import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const commonPrefix = `https://api.coinstats.app/public/v1`;
const cryptoEndPoints = {
  GET_COINS: `${commonPrefix}/coins`,
  // GET_COIN:`${commonPrefix}/coins`,
  GET_PRICE_CHART: `${commonPrefix}/charts`,
  GET_EXCHANGES: `${commonPrefix}/exchanges`,
  GET_MARKETS: `${commonPrefix}/markets`,
  GET_TICKERS: `${commonPrefix}/tickers`,
  GET_FIATS: `${commonPrefix}/fiats`,
  GET_NEWS: `${commonPrefix}/news`,
};


@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http: HttpClient) { }
  getFiats(): Observable<null> {
    return this.http.get<null>(`${cryptoEndPoints.GET_FIATS}`);
  }
}
