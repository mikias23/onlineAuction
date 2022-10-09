import { Component, OnInit , Input, Output, EventEmitter,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import {faStream } from '@fortawesome/free-solid-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  close = false;
  selected = 'sidebar';
  auctionsArray = new Array();
  auctioneersArray = new Array();
  biddersArray = new Array();
  admin !:any;
  updateIntervalValue!:any 
  citiesArray = new Array()
  faStream = faStream;
  faTimes = faTimes;
  faTrashAlt = faTrashAlt;
  constructor(private flashMessage: FlashMessagesService, private mainService: MainServiceService,public dialog: MatDialog, private cd: ChangeDetectorRef, private router: Router ) { 

  }

  ngOnInit(): void {
 this.admin =  localStorage.getItem("user");
    this.admin= JSON.parse(this.admin)
  }
  checked = false
  toggleBtns() {

    this.checked = !this.checked;
    this.close = !this.close
  }
  categories = new Array
  categoriesFunc(arrayCateg:any)
  {
this.categories = arrayCateg
  }
  intervalFormEmit(form:any)
  {
 

         this.mainService.updateInterval(form).subscribe((result:any) => {
          if(result.success)
          {
           
            window.scrollTo(0, 0);

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
            window.scrollTo(0, 0);
            setTimeout(() => {
           
            }, 2000);
          }
         })
  }
  auctioneers(arrayAuctioneers:any)
  { 
    console.log(arrayAuctioneers)
     this.auctioneersArray = arrayAuctioneers;
  }
  bidders(arrayBidders:any)
  {
    this.biddersArray = arrayBidders
  }
  auctions(auctionsArray:any)
  {
   this.auctionsArray = auctionsArray;
   console.log(auctionsArray, 'sdsdsdits')
  }

  addCategory(category:any)
  {
    this.mainService.uploadCategory(category).subscribe((result:any) => {
      if(result.success)
      {
        window.scrollTo(0, 0);
        this.cd.detectChanges()

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
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
     })
  }
  
  updateInterval(interval:any)
  {
     this.updateIntervalValue = interval
  }

 
  citiesReturned(citiesArray:any)
  {
  this.citiesArray = citiesArray;
  console.log(citiesArray)
  }
  addCity(form:any)
  {
    this.mainService.uploadCity(form).subscribe((result:any) => {
      if(result.success)
      {
        window.scrollTo(0, 0);
        this.citiesArray.push(form);
        this.cd.detectChanges()


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
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
     })
  }

  deleteUser(objUser:any)
  {

    this.mainService.deleteUser(objUser).subscribe((result:any) => {
      if(result.success)
      {
      
        if(objUser.type === 'bidder')
        {
          this.biddersArray = this.biddersArray.filter((biider:any)=> {
            return biider._id !== objUser.id
          })
        }
        else{
          this.auctioneersArray = this.auctioneersArray.filter((auctioneer:any)=> {
            return auctioneer._id !== objUser.id
          })

          this.auctionsArray = this.auctionsArray.filter((auction:any) => {
            return auction.auctioneerId !== objUser.id
          })
        }

        this.flashMessage.show(result.msg, {
          cssClass: 'alert-success',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        this.cd.detectChanges();
      }
   
      else {
        this.flashMessage.show(result.msg, {
          cssClass: 'alert-danger',
          timeout: 2000
        });
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })
  }


deleteCity(id:any)
{
  this.mainService.deleteCity(id).subscribe((result:any) => {
    if(result.success)
    {
      window.scrollTo(0, 0);

      this.citiesArray = this.citiesArray.filter((city:any) => {
        return city._id !== id
      })
      this.cd.detectChanges();
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
      window.scrollTo(0, 0);
      setTimeout(() => {
     
      }, 2000);
    }
  })
}

  deleteCategory(id:any)
  
  {
    
    this.mainService.deleteCategory(id).subscribe((result:any) => {
      if(result.success)
      {
        window.scrollTo(0, 0);

        this.categories = this.categories.filter((catego:any) => {
          return catego._id !== id
        })
        this.cd.detectChanges()

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
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })
  }


  deleteAuction(id:any)
  
  {
    
    
    this.mainService.removeAuction(id).subscribe((result:any) => {
      if(result.success)
      {
        window.scrollTo(0, 0);

        this.auctionsArray = this.auctionsArray.filter((catego:any) => {
          return catego._id !== id
        })
        this.cd.detectChanges()

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
        window.scrollTo(0, 0);
        setTimeout(() => {
       
        }, 2000);
      }
    })
  }

  approveAuctioneer(approveObject:any){
    this.mainService.approveAuctioneer(approveObject).subscribe((result:any) => {

    })
  }
hideSideBar(option:string)
{
  this.checked = false;
  this.close = !this.close
  this.selected = option
}

auctionsHistoryArray = new Array()
auctionsHistory(histArray:any)
{
   this.auctionsHistoryArray = histArray
} 

deleteAuctionHist(id:any)
{
  this.mainService.removeAuctionsHist(id).subscribe((result:any) => {
    if(result.success)
    {
      window.scrollTo(0, 0);

      this.auctionsHistoryArray = this.auctionsHistoryArray.filter((catego:any) => {
        return catego._id !== id
      })
      this.cd.detectChanges()

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
      window.scrollTo(0, 0);
      setTimeout(() => {
     
      }, 2000);
    }
  })
}


removeAll(type:any)
{
 
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:`Are You Sure You want to to delete all of ${type} ?`}});

  dialogRef.afterClosed().subscribe((result:any) => {

    if(result === 'true')
    {
      this.mainService.removeAll(type).subscribe((result:any)=> {
        if(result.success)
        {
          switch(type)
          {
            case 'categories':
              {

            break;
              }
            case 'cities':
                {
                  this.citiesArray = [];

           break;  
                }
            case 'auctions':
                {
                  this.auctionsArray = [];

            break;  
                }
           case 'bidders':
                {
                  this.biddersArray = []
            break;  
                }
            case 'auctioneers':
                  {
                    this.auctioneersArray = [];
                    this.auctionsArray = [];
                    this.auctionsHistoryArray = []
             break;  
                  }
            case 'histories':
                    {
                      this.auctionsHistoryArray = []
                 break;  
                    }
          }
          this.cd.detectChanges()
        }
        else {
    
        }
      })
    }

  })

}
}
