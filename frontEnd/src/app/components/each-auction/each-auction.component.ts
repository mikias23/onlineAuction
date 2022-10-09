import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {  FlashMessagesService } from 'flash-messages-angular';
import { MainServiceService } from 'src/app/services/main-service.service';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { TransitionCheckState } from '@angular/material/checkbox';

@Component({
  selector: 'app-each-auction',
  templateUrl: './each-auction.component.html',
  styleUrls: ['./each-auction.component.scss']
})
export class EachAuctionComponent implements OnInit {
  faEye = faEye;
  dateNow  = new Date().getTime();
  remainingTime!:number;
  comment = ''
  bidderRating!:any;
  imgSrc !: string;
  faDollarSign = faDollarSign;
  @Input() auction!:any;
  @Input() type!:any;
  // get Auctioneer
  bidderRatedAuctionBefore = false;
  @Input() unsubscribe!:any;
  @Input() history!:any;
  @Input() bidder!:any;
  @Input() auctioneer!:any;
  bidders = new Array();
  status = 'available';
  availableForWhat = '';
  ratingValue = 50;

  @Output() auctionDelete: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() deleteRating: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() rateAuction: EventEmitter<Object> = new EventEmitter<Object>();
  constructor(private stateService: StateService,private router : Router, public dialog: MatDialog,private flashMessages: FlashMessagesService,private mainService:MainServiceService) { }
  ratingForm = new FormGroup(
    {

     rating:new FormControl(50, [Validators.required]),
     comment: new FormControl(`${this.comment}`)
    }
  )
  rangeInput(value:any)
  {
     this.ratingValue = value.target.value
  }
  get f()
  {
      return this.ratingForm.controls;
  }
  ngOnInit(): void {

    this.imgSrc  = this.auction.itemImagePath[0];
    this.remainingTime = this.auction.endDate - this.dateNow;
     if(this.auction.format === 'live')
     { 
                if(this.dateNow > this.auction.startDate)
                {
                   this.status = 'Open';
                   this.availableForWhat = 'For subscription '
                } 
                else if(this.dateNow <= this.auction.startDate <= this.auction.endDate) {
                  this.status = 'Open'
                  this.availableForWhat = 'For Bidding'

                } 
                else {
                  this.status = 'Over'

                }  
     }
     else {
       
      if(this.dateNow < this.auction.startDate)
      {
        this.status = 'Opening Soon'
      }
      else {
        if( this.dateNow <= this.auction.endDate) {
          this.status = 'Open'
        
        } 
        else {
          this.status = 'Over'
  
        }  
      }

     }

     if(this.history)
     {
      this.status = 'Closed'
      let ratingsAuction = this.auction.ratings
        ratingsAuction.forEach((rating:any) => {
          if(rating.bidderId === this.bidder._id)
          {
            this.bidderRatedAuctionBefore = true;
            this.bidderRating = rating;
            this.comment = rating.comment;
            this.ratingValue = rating.rating;

          }
        })
     }


     
  }
  viewDetail()
  {
     
    localStorage.setItem('auction', JSON.stringify(this.auction));
    this.router.navigate(['/viewAuction'])
  }

  deleteAuction(auctionId:any)
  {
    this.auctionDelete.emit(auctionId)
  }

  unsubscribeBidder()
{
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to Unsubscribe?'}});

  dialogRef.afterClosed().subscribe((result:any) => {
  if(result === 'true')
  {
    let unsubscribeObj= {
      bidderId:this.bidder._id,
      auctionId: this.auction._id
     }
    
      this.mainService.unsubscribeBidder(unsubscribeObj).subscribe((result:any) => {
        if(result.success)
        {
  
           this.flashMessages.show(result.msg, {
             cssClass: 'alert-success',
             timeout: 2000
           })
           window.scrollTo(0, 0);
           location.reload()
           
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
toggle = false;
toggleBtn()
{
this.toggle = !this.toggle
this.rateText='Submit Rate'
}


rate()
{
  let obj = this.ratingForm.value;
  obj.auctionId = this.auction._id;
  obj.bidderId = this.bidder._id
   this.rateAuction.emit(obj) 
}

rateText = ''
edit()
{
  this.toggle = !this.toggle
  this.rateText='Edit Rate'
}
delete()
{
  let obj = {
   auctionId: this.auction._id,
   bidderId : this.bidder._id
  }

  this.deleteRating.emit(obj)
  this.bidderRatedAuctionBefore = false



}


payment()
{
  localStorage.setItem('auctionId', JSON.stringify(this.auction._id));

  this.router.navigate(['/payment'])

}

}
