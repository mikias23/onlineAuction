import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-top-bid',
  templateUrl: './top-bid.component.html',
  styleUrls: ['./top-bid.component.scss']
})
export class TopBidComponent implements OnInit, OnChanges {

  @Input() subscribers!:any;
  @Input() bidders!:any;
  @Input() topOrBaseBid!:any;
  @Input() dateObj !:any;
  dateNow  = new Date();
  remainingTime!:number;

  auction!: any;
  objShown!:any;
 

  ngOnChanges(changes:SimpleChanges)
  {

    if(changes['subscribers'].firstChange )
    {
      return ;
    }
    this.onInitCopy();
    console.log(this.subscribers, this.topOrBaseBid)
  }
  constructor() { }

  ngOnInit(): void {
    this.auction =  localStorage.getItem("auction");
    this.auction= JSON.parse(this.auction);
     this.onInitCopy()
  }
  onInitCopy()
  {
    this.remainingTime = this.dateObj.endDate - this.dateNow.getTime();
    this.objShown = {
      bid: 0,
      username: '________',
      phone: '_______',
      imgPath: '',
      topBidExist: false
    }
    
    this.objShown.bid = this.topOrBaseBid
       if(this.subscribers.length)
       {
        this.subscribers.forEach((sub:any) => {

          console.log('reached here', this.bidders, sub.bidderId)
          if(sub.bidAmount >= this.topOrBaseBid)
          {
         
            console.log('sdsdsdsdsd')
              this.bidders.forEach((bidder:any) => {
            
                if(bidder._id === sub.bidderId)
                {
                  console.log('sdaazxew')
                  this.objShown.username = bidder.username;
                  this.objShown.imgPath = bidder.profilePicPath;
                  this.objShown.phone = bidder.phone;
                  this.objShown.topBidExist = true

                }
              })
              console.log(this.objShown)

          }
        })
      

       }
  }

}
