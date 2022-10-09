import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExchangeService } from './services/exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('750ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('750ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'CurrencyExchange';
  currency1a:any={name:'Select',imageUrl:'',rate:1};
  currency2a:any={name:'Select',imageUrl:'',rate:1};
  isScreenLtMedium: boolean = false;
  currency1Value:number;
  currency2Value:number;
  rate1:number;
  rate2:number;
  breakpoint:any
  getScreenWidth: any;
  fiatSubscription: Subscription;
  fiatsArr: any[]=[];
  isLoaded: boolean=false;
  constructor(private exchangeService:ExchangeService){}

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 400 ? 1 : 6;
    this.onWindowResize();
    this.getFiats();
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth <= 850) {
      this.isScreenLtMedium = true;
    } else {
      this.isScreenLtMedium = false;
    }
    this.breakpoint = this.isScreenLtMedium ? 1 : 6;
  }

  getFiats() {
    this.isLoaded=false
    this.fiatSubscription = this.exchangeService.getFiats().subscribe((res: any) => {
      this.fiatsArr = res;
      this.isLoaded=true
    });
  }

  dealCurrency(currency, num){
    console.log(currency,num)
    switch(num){
      case 1:
        this.currency1a=currency
        this.rate1=this.currency1a.rate
        this.handleCal(2)
        break;
      case 2:
        this.currency2a=currency
        this.rate2=this.currency2a.rate
        this.handleCal(1)
        break;
    }
  }

handleCal(num){
  if(num===1){
    if(this.rate2>this.rate1){
      this.currency2Value=this.currency1Value*this.rate2
    }else if(this.rate2<this.rate1){
      this.currency2Value=this.currency1Value/this.rate1
    }else{
      this.currency2Value=this.currency1Value
    }
    
  }else if(num===2){
    if(this.rate1>this.rate2){
      this.currency1Value=this.currency2Value*this.rate1
    }else if(this.rate1<this.rate2){
      this.currency1Value=this.currency2Value/this.rate2
    }else{
      this.currency1Value=this.currency2Value
    }
  }

  if(this.currency1Value===0){
    this.currency1Value=undefined
  }
  if(this.currency2Value===0){
    this.currency2Value=undefined
  }
  
}

interchange(){
  let c1=this.currency1a;
  let c2=this.currency2a;
  this.dealCurrency(c1,2);
  this.dealCurrency(c2,1);
}

  ngOnDestroy(): void {
    this.fiatSubscription.unsubscribe();
  }
}
