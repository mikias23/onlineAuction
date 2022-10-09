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
  selector: 'app-auctioneer-profile',
  templateUrl: './auctioneer-profile.component.html',
  styleUrls: ['./auctioneer-profile.component.scss']
})
export class AuctioneerProfileComponent implements OnInit {

  auctioneer!:any;

  auctioneerAuctions = new Array();
  auctioneerHistory = new Array();


  constructor(private flashMessage: FlashMessagesService, private mainService: MainServiceService, private observer: BreakpointObserver, private router : Router, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.auctioneer =  localStorage.getItem("user");
    this.auctioneer= JSON.parse(this.auctioneer);
  }
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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
hideSideBar()
  {
    if(this.sidenav.mode === 'over')
    {
      this.sidenav.close();
    }
  }
 
auctions(auctionsArray:any)
  {
   this.auctioneerAuctions = auctionsArray.filter((auction:any) => {
    return this.auctioneer._id === auction.auctioneerId 
   })
  
  }


auctionDelete(auction:any)
  {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to to delete auction?'}});

    dialogRef.afterClosed().subscribe((result:any) => {
  
    if(result === 'true')
    {
   
      
      this.mainService.removeAuction(auction).subscribe((result:any) => {
        if(result.success)
        {
          this.auctioneerAuctions = this.auctioneerAuctions.filter((auct:any) => {
            return auction._id !== auct._id
          })
          this.flashMessage.show(result.msg, {
            cssClass: 'alert-success',
            timeout: 2000
          })
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


auctionsHistory(arrayHistory:any)
{
  this.auctioneerHistory = arrayHistory.filter((auction:any) => {
    return this.auctioneer._id === auction.auctioneerId 
   })
}
deactivateAccount()
{
  let objDeleted = {
    type : 'auctioneer',
    _id: this.auctioneer._id
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


newUser(user:any)
{

  this.auctioneer = user;
}
 


}
