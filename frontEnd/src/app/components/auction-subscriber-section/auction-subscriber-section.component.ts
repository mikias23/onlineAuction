import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-auction-subscriber-section',
  templateUrl: './auction-subscriber-section.component.html',
  styleUrls: ['./auction-subscriber-section.component.scss']
})
export class AuctionSubscriberSectionComponent implements OnInit, OnChanges {
  @Input() bidders = new Array();
  @Input() subscribers = new Array();
  faTimes = faTimes;
  @Output() unsubscribeBidder: EventEmitter<Object> = new EventEmitter<Object>();
  bidder!:any;
displayCol = new Array()
 

  constructor() { 
    }
    ngOnChanges(changes:SimpleChanges)
    {
      if(changes['subscribers'].firstChange)
      {
        return ;
      }
      this.displayCol = [];
       console.log(this.subscribers)
      this.fillObjArray()
      
    
    
    }
    fillObjArray()
    {
      console.log(this.subscribers, this.bidders)
      this.subscribers.forEach((eachSubs:any, index:any) => {
        for(let i = 0 ; i < this.bidders.length; i++)
        {
  
        if(this.bidders[i]._id === eachSubs.bidderId)
        {
          let phone
          if(eachSubs.bidderPhone)
          {
            phone  = eachSubs.bidderPhone
          }
          else {
            phone  = eachSubs.phone
          }
  
             this.displayCol.push({    username:this.bidders[i].username, 
              phone:phone,
              image: this.bidders[i].profilePicPath,
              delete: 'X'})
        }
      }
  
      })

    }
  ngOnInit(): void {
    this.bidder =  localStorage.getItem("user");
    this.bidder= JSON.parse(this.bidder);
        this.fillObjArray();

    
  }

  unsubscribe()
    {
      this.unsubscribeBidder.emit(this.bidder._id);
     
    }
}
