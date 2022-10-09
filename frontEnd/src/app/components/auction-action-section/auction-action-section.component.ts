import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-auction-action-section',
  templateUrl: './auction-action-section.component.html',
  styleUrls: ['./auction-action-section.component.scss']

})
export class AuctionActionSectionComponent implements OnInit, OnChanges {

  @Input() subscribers  = new Array();
  @Input() bidders!:any;
  @Input() topOrBaseBid!: any;
  @Input() auctionType!: any;
  @Input() dateObj !:any;
  @Input() auction !:any;
  regularSubscriptionNotStarted = false;
  liveAuctionStatus = ''
  dateNow  = new Date().getTime();
  remainingTime!:number;
  @Output() subscribeBidder: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() unsubscribedBidder: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() removeBid: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() bidFormEmit: EventEmitter<Object> = new EventEmitter<Object>();
  
  unsubscribe = false;
  bidMade = false;

  user !: any;
  yourBid !:any;
  bidder = false;
  loggedIn = false;
  bidderPhone = '';

  constructor(private cd: ChangeDetectorRef) { }
  subscribeForm = new FormGroup(
    {

      phone:new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      bidderId: new FormControl('')
    }
  )
  bidForm = new FormGroup(
    {

      bidAmount:new FormControl('', [Validators.required]),
      bidderId: new FormControl(''),
      bidderPhone:new FormControl('')
    }
  )

  get f()
  {
      return this.subscribeForm.controls;
  }
  ngOnChanges(changes:SimpleChanges)
  {
    if(changes['subscribers'].firstChange)
    {
      return ;
    }
    
  
    this.fillObjArray()
    
  
  
  }
  ngOnInit(): void {
    this.topOrBaseBid;
    if(this.auction.type === 'normal')
    {
        this.topOrBaseBid++
    }
    else{
      this.topOrBaseBid--

    }
    console.log(this.topOrBaseBid)
    this.user =  localStorage.getItem("user");
    this.user= JSON.parse(this.user);

    if(this.user)
    {
     this.loggedIn = true;
     if(!this.user.bussinessType)
     {
       this.bidder = true;
       
       this.subscribeForm.patchValue({'phone':this.user.phone});
    this.fillObjArray()
       
       
     }
    }


  }
  subscribe()
  {
    
  
    this.subscribeForm.patchValue({'bidderId':this.user._id});
  this.subscribeBidder.emit(this.subscribeForm.value);

 
  }
  bid()
  {
  this.bidForm.patchValue({'bidderId': this.user._id});

  this.bidForm.patchValue({'bidderPhone': this.bidderPhone});


  this.bidFormEmit.emit(this.bidForm.value);
  this.cd.detectChanges();
  this.fillObjArray();

 

  }

  fillObjArray()
  {
    this.unsubscribe = false;
        if(this.auction.format === 'live')
    {
      if( this.auction.startDate > this.dateNow )
      {
      this.liveAuctionStatus = 'subscribe'
      } 
      else if(   this.dateNow <= this.auction.startDate <= this.auction.endDate){
        this.liveAuctionStatus = 'bid'

      } 
      else {
        this.liveAuctionStatus = 'over'

      }
    }
    else {
      if(this.auction.startDate > this.dateNow)
      {
         this.regularSubscriptionNotStarted= true;
      }
      this.remainingTime = this.dateObj.endDate - this.dateNow;
    }

      
    this.subscribers.forEach((subscriber) => {
      if(this.user._id ===  subscriber.bidderId)
      {
        this.unsubscribe = true;
        this.bidderPhone = this.user.phone;
        this.yourBid  = subscriber.bidAmount;
        let amount = subscriber.bidAmount
        if(amount > 0)
        {  
          this.bidMade = true;
  
        }
        else {
          this.bidMade = false
        }
      }
      else {
      }
     })
  }
  unsubscribeBidder(bidderId:any)
  {

    this.unsubscribedBidder.emit(bidderId);

  }

  deleteBid(bidderId:any)
  {
   this.removeBid.emit(bidderId)
  }

  EditBid()
  {
    this.bidMade  = !this.bidMade;
  }

}
