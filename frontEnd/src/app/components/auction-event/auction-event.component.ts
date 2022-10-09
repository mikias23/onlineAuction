import { Component, OnInit, Input,} from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auction-event',
  templateUrl: './auction-event.component.html',
  styleUrls: ['./auction-event.component.scss']
})
export class AuctionEventComponent implements OnInit {
  faCalendarDays = faCalendarDays;
  @Input() dateObj :any;
  @Input() auction !:any;
  constructor() { }
  dateShow = {
    days: 0,
    hours: 0,
    mins:0,
    secs:0
  }
  liveAuctionDay = 0;
  coolVar = ''
  dateNow = new Date().getTime();
  percent = 0;
  temp = 24*60*60*1000;
  span = 0;
  strokeLength = 0;
  checkIfDatePassed = 0;
  AuctionYetToBegin  = false;
  ngOnInit(): void {
      this.calcCirclePercent()
 
  }
  calcCirclePercent()
{

  if(this.auction.format === 'regular')
  {
    this.span = Math.round(this.dateObj.diff/this.temp);
  

    if(this.dateObj.startDate > this.dateNow)
    {
      this.percent = this.dateObj.startDate - this.dateNow;
      this.AuctionYetToBegin = true
      this.span= Math.round(this.percent/this.temp)
      this.coolVar = 'Auction starts In'
    }
    else {
      this.percent = this.dateObj.endDate-this.dateNow;
      this.coolVar = 'Auction Ends In'

    }
    this.percent = Math.round(this.percent/this.temp);
  
    this.checkIfDatePassed = Math.floor((this.dateObj.endDate - this.dateNow)/this.temp);
    if(this.percent >= 0)
    {
     this.strokeLength = Math.round(this.percent * 255/this.span);
     console.log(this.strokeLength)
     this.strokeLength = 255-this.strokeLength ;
     console.log(this.strokeLength)
    }
  }
  else {
     this.percent = Math.floor((this.dateObj.startDate - this.dateNow)/this.temp)
     ;
  
     if(this.dateObj.startDate > this.dateNow)
     {
       this.percent = this.dateObj.startDate - this.dateNow;
       this.AuctionYetToBegin = true
       this.span= Math.round(this.percent/this.temp)
       this.coolVar = 'Live Auction starts In';
       this.liveAuctionDay = Math.round(this.percent/(24*60*60*1000)) 
     }
    
     this.checkIfDatePassed = Math.floor((this.dateObj.endDate - this.dateNow)/this.temp);

     if(this.percent >= 0)
     {
      this.strokeLength = Math.floor(this.percent * 255/this.percent);
      this.strokeLength = 255-this.strokeLength 
     }
  }

  
};

}
