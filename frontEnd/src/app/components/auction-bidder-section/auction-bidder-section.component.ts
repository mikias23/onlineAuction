import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-auction-bidder-section',
  templateUrl: './auction-bidder-section.component.html',
  styleUrls: ['./auction-bidder-section.component.scss']
})
export class AuctionBidderSectionComponent implements OnInit, OnChanges {

  @Input() bidders :any;
  @Input() subscribers: any;
  @Input() topOrBaseBid: any;
  @Output() removeBidderBid: EventEmitter<Object> = new EventEmitter<Object>();

  faTimes = faTimes;
  bidder!:any;
  displayCol = new Array()


  constructor() { }

ngOnChanges(changes:SimpleChanges)
{
  if(changes['subscribers'].firstChange)
  {
    return ;
  }
  this.displayCol = [];

  this.fillObjArray()
  
  console.log(this.subscribers)

}
  ngOnInit(): void {
    this.bidder =  localStorage.getItem("user");
    this.bidder= JSON.parse(this.bidder);
    this.fillObjArray()
  }
  fillObjArray()
  {
    this.subscribers.forEach((eachSubs:any, index:any) => {
      for(let i = 0 ; i < this.bidders.length; i++)
      {

      if(this.bidders[i]._id === eachSubs.bidderId)
      {         
        this.displayCol.push({  image: this.bidders[i].profilePicPath,
          username:this.bidders[i].username, 
          bid:eachSubs.bidAmount,
       
          delete: ''
        })


      }
    }

    })
    this.subscribers = []
  }
  removeBid()
    {
     
      this.removeBidderBid.emit(this.bidder._id)
    }
}
