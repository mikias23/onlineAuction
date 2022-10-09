import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-fetch',
  templateUrl: './fetch.component.html',
  styleUrls: ['./fetch.component.scss']
})
export class FetchComponent implements OnInit {

  constructor(private flashMessage: FlashMessagesService, private mainService: MainServiceService) { }

  @Output() auctions: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() cities: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() categories: EventEmitter<Object> = new EventEmitter<Object>();

  @Output() bidders: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() auctioneers: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() auctionsHistory: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() returnInterval: EventEmitter<Object> = new EventEmitter<Object>();

  ngOnInit(): void {
    this.mainService.fetchAuctions().subscribe((result:any) => {
      if(result.success)
      {
        console.log(result.data)
     this.auctions.emit(result.data);
         
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })

    // fetch Auctioneer that posted auction selected
    this.mainService.fetchAuctioneers().subscribe((result:any) => {
      if(result.success)
      {
        console.log(result.data)
     this.auctioneers.emit(result.data);
         
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })
    this.mainService.fetchBidders().subscribe((result:any) => {
      if(result.success)
      {
        console.log(result.data)
     this.bidders.emit(result.data);
         
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })
    this.mainService.fetchCities().subscribe((result:any) => {
      if(result.success)
      {
     this.cities.emit(result.data);
         
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })

    this.mainService.fetchCategories().subscribe((result:any) => {
      if(result.success)
      {
     this.categories.emit(result.data);
         
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })
    this.mainService.getInterval().subscribe((result:any) => {
      if(result.success)
      {
        this.returnInterval.emit(result.interval);
         
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })
    this.mainService.fetchAuctionsHistory().subscribe((result:any) => {
      if(result.success)
      {
        console.log(result.data)
     this.auctionsHistory.emit(result.data);
         
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })
  }


}
