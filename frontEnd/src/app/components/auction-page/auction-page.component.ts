import { Component,  OnInit , Input,AfterViewInit,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { filter, Subscriber } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-auction-page',
  templateUrl: './auction-page.component.html',
  styleUrls: ['./auction-page.component.scss']
})
export class AuctionPageComponent implements OnInit{
  //icons
  faMoneyCheckAlt = faMoneyCheckAlt
  
   bidder !:any;
   topOrBaseBid = 0;
   auctionType = 'regular'
   currentObj= new Array()
  auction !:any;
  biddersInvolved = new Array();
  biddersId = new Array();
  auctionSubscribers = new Array();
  auctioneer !:any;
  infoArrayType = ['type', 'format', 'city', 'startDate', 'endDate', 'span', 'category', 'city', 'phone'];
  infoArrayDisplayable = new Array();
  dateObj = {
    startDate: 0,
    endDate: 0,
    diff:0
  };
  constructor(private mainService:MainServiceService, private flashMessages: FlashMessagesService ,private router : Router, public dialog: MatDialog, private cd: ChangeDetectorRef) {

   }

   updateBidderNotification!:any;
  ngOnInit(): void {
 
    this.auctionSubscribers = []
    this.auction =  localStorage.getItem("auction");
    this.auction= JSON.parse(this.auction);
    this.bidder =  localStorage.getItem("user");
    this.calDate();
    this.updateBidderNotification = localStorage.getItem("updateBidderNotification");localStorage.removeItem('updateBidderNotification')
    if(this.updateBidderNotification)
    {
    this.mainService.updateBidderNotify(this.updateBidderNotification, this.auction._id).subscribe((res:any)=> {
      if(res.success)
      {

      }
      else {
          
      }
    })
      console.log(this.updateBidderNotification)
    }
    this.bidder= JSON.parse(this.bidder);

   this.auctionSubscribers = this.auction.subscribers;

   this.topOrBaseBid  = this.auction.startingBid;
   this.auctionType = this.auction.format;
   if(this.auctionSubscribers.length !== 0)
   {
      for(let i = 0 ; i <this.auctionSubscribers.length; i++) 
      {
        this.biddersId.push(this.auctionSubscribers[i].bidderId);
        if(this.topOrBaseBid < this.auctionSubscribers[i].bidAmount)
        {
          this.topOrBaseBid =  this.auctionSubscribers[i].bidAmount
        }
      }
  

   }
 
   this.populateInfo()

  }

  populateInfo()
  {
    var startDate =  new Date(this.auction.startDate);
  
    var startDateShow = startDate.getDate()  + "-" + (startDate.getMonth()+1) + "-" + startDate.getFullYear();
    var endDate =  new Date(this.auction.endDate);
  
    var endDateShow = endDate.getDate()  + "-" + (endDate.getMonth()+1) + "-" + endDate.getFullYear();

    this.infoArrayType.forEach((keys:any) => {
      Object.entries(this.auction).forEach(([key, value]) => {
        if(key === keys )
        {
          if(key === 'endDate')
            this.infoArrayDisplayable.push(endDateShow)
          else if(key === 'startDate')
            this.infoArrayDisplayable.push(startDateShow)
          else 
            this.infoArrayDisplayable.push(value)
        }
      })
    })
  }
  biddersMethod(bidders:any)
  {
  
   if(this.biddersId.length !== 0)
   {
    let j = 0 ;
     for(let i = 0 ; i < this.biddersId.length; i++)
     {
     
      
       bidders.forEach((bidder:any) => 
      {
       if(bidder._id === this.biddersId[i])
       {
        this.biddersInvolved[j] = bidder;
        j++;
       }
      } )
      
     }


   }
   console.log(this.biddersId, ' then', this.biddersInvolved)
  }
  auctioneersMethod(auctioneers: any)
  {
   console.log(this.auction.auctioneerId)

auctioneers.forEach((each:any) => {
  if(each._id === this.auction.auctioneerId)
  {
    this.auctioneer = each;
  }
 
})
  }
// subscribe Bidder
subscribeBidder(subscriber:any)
{
  // adding auction id to subscriberObject
  console.log(subscriber)
let subscriberObject = subscriber;
  subscriberObject.auctionId = this.auction._id;

  this.auction.subscribers.push(subscriberObject)
  this.auctionSubscribers = this.auction.subscribers;
  localStorage.setItem('auction', JSON.stringify(this.auction));

  this.mainService.subscribeBidder(subscriberObject).subscribe((result:any) => {
    if(result.success)
    {
      this.updateChildUI('add', 'subscribe', subscriber)
       this.flashMessages.show(result.msg, {
         cssClass: 'alert-success',
         timeout: 2000
       })
       window.scrollTo(0, 0);
       
    }
    else {
      this.flashMessages.show(result.msg, {
        cssClass: 'alert-danger',
        timeout: 2000
      });
      window.scrollTo(0, 0);
  
    }
  })

}

submitBid(bid:any)
{
  console.log(bid)
  let bidObj = bid;
   bidObj.auctionId = this.auction._id;
   this.mainService.submitBid(bidObj).subscribe((result:any) => {
    if(result.success)
    { 
     

      this.auctionSubscribers = this.auctionSubscribers.filter((sub:any) => {
        return sub.bidderId !== bid.bidderId
      })
      this.auctionSubscribers.push(bid);
      
      this.auction.subscribers = this.auctionSubscribers;
      localStorage.setItem('auction', JSON.stringify(this.auction));
      for(let i = 0 ; i <this.auctionSubscribers.length; i++) 
      {
      
        if(this.topOrBaseBid < this.auctionSubscribers[i].bidAmount)
        {
          this.topOrBaseBid =  this.auctionSubscribers[i].bidAmount
          console.log(this.auctionSubscribers[i].bidAmount)
        }
      }
      this.cd.detectChanges()
       this.flashMessages.show(result.msg, {
         cssClass: 'alert-success',
         timeout: 2000
       })
       window.scrollTo(0, 0);
       
    }
    else {
      this.flashMessages.show(result.msg, {
        cssClass: 'alert-danger',
        timeout: 2000
      });
      window.scrollTo(0, 0);
  
    }
  })

}

// unsubscribe bidder from an auction 

unsubscribeBidder(bidderId:any,)
{
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to Unsubscribe?'}});

  dialogRef.afterClosed().subscribe((result:any) => {
  if(result === 'true')
  {
    let unsubscribeObj= {
      bidderId:bidderId,
      auctionId: this.auction._id
     }

   
 
      this.mainService.unsubscribeBidder(unsubscribeObj).subscribe((result:any) => {
        if(result.success)
        {
          this.updateChildUI('remove', 'subscribe',bidderId)
           this.flashMessages.show(result.msg, {
             cssClass: 'alert-success',
             timeout: 2000
           })
           window.scrollTo(0, 0);
           
        }
        else {
          this.flashMessages.show(result.msg, {
            cssClass: 'alert-danger',
            timeout: 2000
          });
          window.scrollTo(0, 0);
      
        }
      })
    this.flashMessages.show('Updated', {
      cssClass: 'alert-success',
      timeout: 3000
    })



  }
  else {
 
  }
   
  })


}

removeBidderBid(bidderId:any)
{
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to to Remove your bid?'}});

  dialogRef.afterClosed().subscribe((result:any) => {

  if(result === 'true')
  {
    let unsubscribeObj= {
      bidderId:bidderId,
      auctionId: this.auction._id
     }
let tempObject:any ;
    
      this.mainService.removeBid(unsubscribeObj).subscribe((result:any) => {
        if(result.success)
        {
          this.auctionSubscribers.forEach((sub:any) => {
            if(sub.bidderId === unsubscribeObj.bidderId)
            {
                     tempObject = sub;
                     tempObject.bidAmount = 0
            }
          })
          this.auctionSubscribers = this.auctionSubscribers.filter((sub:any) => {
               return sub.bidderId !== unsubscribeObj.bidderId
          })
       this.auctionSubscribers.push(tempObject);

       this.auction.subscribers = this.auctionSubscribers;
       localStorage.setItem('auction', JSON.stringify(this.auction));
           this.flashMessages.show(result.msg, {
             cssClass: 'alert-success',
             timeout: 2000
           })
           window.scrollTo(0, 0);
           
        }
        else {
          this.flashMessages.show(result.msg, {
            cssClass: 'alert-danger',
            timeout: 2000
          });
          window.scrollTo(0, 0);
      
        }
      }) 
  }
  else {

  }
})
 

}

// update  UI after bid added or removed ,  bidder subscribed or unsubscribed;

updateChildUI(action:any, type:any, data:any){
 
    
     if(action === 'add')
     {
      if(type === 'subscribe')
      {
        data.bidAmount = 0;
    
        this.biddersInvolved.push(this.bidder)
        this.cd.detectChanges()
      }
      if(type === 'bid')
      {
     

  this.auctionSubscribers.forEach((subs:any)=> {
          if(subs.bidderId === data.bidderId)
          {   
            let tempo  = {bidAmount: data.bidAmount, bidderId: data.bidderId, bidderPhone: data.bidderPhone, auctionId: data.auctionId}
            console.log(tempo)
            this.currentObj.push(tempo);
        

          }
          else {
             
            this.currentObj.push(subs);

          }
     
          
        });
this.auctionSubscribers = [];
        this.currentObj.forEach((ob:any) => {
          console.log(ob)
          this.auctionSubscribers.push(ob)
        })
        console.log(this.auctionSubscribers)
        this.cd.detectChanges();
        this.currentObj = []

      
      }
     }
     if(action === 'remove')
     {
      if(type === 'subscribe')
      {
           this.auctionSubscribers = this.auctionSubscribers.filter((sub:any) => {
               return  sub.bidderId !== this.bidder._id           
        });

        this.auction.subscribers = this.auctionSubscribers


        localStorage.setItem('auction', JSON.stringify(this.auction));

     this.biddersInvolved = this.biddersInvolved.filter((bid:any) => {
           return  bid._id !== this.bidder._id
    });
    this.cd.detectChanges()

      }
     }
     else {
      
      let currentObjs:any  = [];
      this.auctionSubscribers.forEach((subs:any)=> {
        if(subs.bidderId === data.bidderId)
        {   
          subs.bidAmount = 0;

          currentObjs.push(subs);
      

        }
        else {
          currentObjs.push(subs)
        }
        
      });
        this.auctionSubscribers = []
      this.auctionSubscribers = [...currentObjs]
      
     } 
 }


calDate()
{
this.dateObj.startDate =this.auction.startDate, this.dateObj.endDate = this.auction.endDate;
this.dateObj.diff = this.dateObj.endDate - this.dateObj.startDate ;

console.log(this.dateObj.startDate,this.dateObj.endDate)

}



}
