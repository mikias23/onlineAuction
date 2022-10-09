import { Component, OnInit,  ViewChild, AfterViewInit  } from '@angular/core';
import { FormControlName, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';
import {BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

import { Router } from '@angular/router';
@Component({
  selector: 'app-bidder-profile',
  templateUrl: './bidder-profile.component.html',
  styleUrls: ['./bidder-profile.component.scss']
})
export class BidderProfileComponent implements OnInit {
  bidder!:any;
  auctionsArray = new Array();
  biddersInvolved = new Array();
 biddersArray = new Array();
 auctionsHistoryBidderSubscribed = new Array()
  auctionsBidderInvolved =new Array()
  constructor(private flashMessage: FlashMessagesService, private mainService: MainServiceService, private observer: BreakpointObserver, private router : Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.bidder =  localStorage.getItem("user");
    this.bidder= JSON.parse(this.bidder);
  }
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  users= new Array();
  ngAfterViewInit()
  {
   this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
     if(res.matches)
     {
       this.sidenav.mode = 'over';
       this.sidenav.close()
     }
     else {
       this.sidenav.mode = 'side';
       this.sidenav.open();
     }
   })
  }
  newUser(user:any)
  {
  console.log(user)
    this.bidder = user;
  }
  deactivateAccount()
{
  let objDeleted = {
    type : 'bidder',
    _id: this.bidder._id
  }
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to to delete auction?'}});

  dialogRef.afterClosed().subscribe((result:any) => {

  if(result === 'true')
  {
 
    

    this.mainService.removeAccount(objDeleted).subscribe((result:any) => {
      if(result.success)
      {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        })

    this.mainService.logOut()
    location.reload()
       
        window.scrollTo(0, 0);
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-daanger',
          timeout: 2000
        })
      }
    })
        
        
  }

})

}

  hideSideBar()
  {
    if(this.sidenav.mode === 'over')
    {
      this.sidenav.close();
    }
  }
  auctions(auctionsArray:any)
  {
 
  auctionsArray.forEach((auction:any) => {
    auction.subscribers.forEach((sub:any) => {
      if(sub.bidderId === this.bidder._id)
      {
        
        this.auctionsBidderInvolved.push(auction)
      }
    })
  })
  this.auctionsBidderInvolved.forEach((auction:any) => {
    this.biddersArray.forEach
  })
  }
  bidders(biddersArray:any)
  {
     this.biddersArray = biddersArray;


  }
  getBiddersInvolved(subscribers:any)
  {
            //  subscribers.forEach((sub:any) => {
            //   this.auctionsBidderInvolved.fo
            //  })
  }

  rateAuction(value:any)
  {
    
    this.mainService.rateAuction(value).subscribe((result:any)=> {
      if(result.success)
      {
   this.flashMessage.show(result.msg, {
    cssClass: 'alert-success',
    timeout: 2000
  });
         
      }
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
 
      }
      window.scrollTo(0, 0);

    }
  )
  }
  auctionsHistory(auctionHistArray:any)
  {
    auctionHistArray.forEach((auction:any) => {
      auction.subscribers.forEach((sub:any) => {
        if(sub.bidderId === this.bidder._id)
        {
          
          this.auctionsHistoryBidderSubscribed.push(auction)
        }
      })
  })
  console.log(this.auctionsHistoryBidderSubscribed)
}

deleteRating(ratingObj:any)
{
  this.mainService.deleteRating(ratingObj).subscribe((result:any)=> {
    if(result.success)
    {
 this.flashMessage.show(result.msg, {
  cssClass: 'alert-success',
  timeout: 2000
});
       
    }
    else {
      this.flashMessage.show(result.msg, {
        cssClass: 'alert-danger',
        timeout: 2000
      });

    }
    window.scrollTo(0, 0);

  }
)
}
  

}
