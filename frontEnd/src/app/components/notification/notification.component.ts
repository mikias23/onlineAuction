import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  bidder!:any;
  bidderAuctions = new Array();
  notifyArray = new Array();
  faEye= faEye;
  notification = 0;
  deadlineDateArray = new Array()
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.bidder =  localStorage.getItem("user");
    this.bidder= JSON.parse(this.bidder);

  }

  auctions(auctionsArray:any)
  {

   let dateNow = new Date().getTime();
  
   auctionsArray.forEach((auction:any)=> {
    if(auction.subscribers.length) 
    {
      auction.subscribers.forEach((subscriber:any) => {
        if(subscriber.bidderId === this.bidder._id)
        {
          

         let deadline =auction.endDate - dateNow;
         deadline= deadline /(60*60*24*1000);
    
       if(subscriber.notify === true )
              {
               this.bidderAuctions.push(auction);
                this.notification++;
              }
              if(deadline > 0 && deadline < 1)
              {                this.notification++;

                this.deadlineDateArray.push(auction);
              }
        }
      })
    }
    
   })

   let topBid =0, auctionId:any, endDate:any, type:any, ItemImagePath:any,msg:any;

    if(this.bidderAuctions.length)
    {
      this.bidderAuctions.forEach((auction:any) => {
         
             auction.subscribers.forEach((Subscriber:any) => {
              if(topBid < Subscriber.bidAmount)
              {
                topBid = Subscriber.bidAmount

              }

              ItemImagePath = auction.itemImagePath[0];
              endDate = auction.endDate;
              auctionId = auction._id;;
              type="bid Update"
              
    

             })
             this.notifyArray.push({type:type, topBid:topBid, auctionId:auctionId, ItemImagePath: ItemImagePath, endDate:endDate})
      })
    }

    if(this.deadlineDateArray.length)
    {
      this.deadlineDateArray.forEach((auction:any) => {
         
        auction.subscribers.forEach((Subscriber:any) => {
          msg = 'Final day of auction!';
         if(Subscriber.format === 'live')
         {
          msg = 'Live Auction is tomorrow'
         }
     
         ItemImagePath = auction.itemImagePath[0];
         endDate = auction.endDate;
         auctionId = auction._id;;
         type="deadline notice"
         


        })
        this.notifyArray.push({type:type, msg:msg, auctionId:auctionId, ItemImagePath: ItemImagePath, endDate:endDate})
 })
    }
  }

seeNotify = false;
  showNotification()
  {
   this.seeNotify = !this.seeNotify;
  }
  seeAuction(notifyId:any, index:any, type:any)
  {
    this.seeNotify = !this.seeNotify;

    this.notification--;
     this.notifyArray = this.notifyArray.filter((each:any) => {
      return each.auctionId !== notifyId
     })
    localStorage.setItem('auction', JSON.stringify(this.bidderAuctions[index]));

    if(type !== 'deadline notice')
    {
      localStorage.setItem('updateBidderNotification', `${this.bidder._id}`);
    }

    this.router.navigate(['/viewAuction'])
  }
}
