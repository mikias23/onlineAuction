import { Component, OnInit, ElementRef, ViewChild ,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { NgbButtonLabel } from '@ng-bootstrap/ng-bootstrap';
import { type } from 'os';
import { filter } from 'rxjs';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('auctionsss')
  auctionss!: ElementRef;
  @ViewChild('auctioneersss')
  auctioneersss!:ElementRef;
  faAngleDoubleLeft = faAngleDoubleLeft

  auctioneers = new Array();
  auctioneersArray = new Array()
  auctioneersArrayStore = new Array()
  auctionsArray= new Array();
  objFilter !:any;
  filter= false;
  auctionsHistoryArray = new Array()
  constructor(private cd: ChangeDetectorRef) { }


  auctionsHistory(histArray:any)
  {
    this.auctionsHistoryArray = histArray;
    

  }
  ngOnInit(): void {
  }
  backToAll()
  {
    this.objFilter = [];
    this.filter =false;
    this.auctioneersArray = this.auctioneersArrayStore
    this.presentable();
  }
  randomIndex = 0 ;
  auctioneer(auctioneers:any)
  {
        this.auctioneersArray = auctioneers;
         this.auctioneers = auctioneers;
         this.auctioneersArrayStore = auctioneers;
         this.randomIndex =  Math.round(Math.random()* this.auctioneers.length -1);
         this.presentable()
  }
  auctions(auctions:any)
  {
    this.auctionsArray = auctions 
  }
  presentable()
  {
 
    this.auctioneers = []

    console.log(this.auctioneersArray.length)
    if(this.auctioneersArray.length > 7)
    { 
 
              for(let i = 0 ; i < 7; i++)
              {
               this.auctioneers.push( this.auctioneersArray[this.randomIndex])
               this.randomIndex++;
               if(this.auctioneersArray.length === this.randomIndex)
               {
                 this.randomIndex = 0
               }

              }
    }
    else {
           this.auctioneers = this.auctioneersArray;
    }


  }
  allAuctioneer()
  {
    this.auctioneers = this.auctioneersArray;
   
    this.presentable();
  }
  leftClicked()
  {
    for(let i = 0 ; i < 6; i++)
    {
      if(this.randomIndex == 0)
      {
        this.randomIndex = this.auctioneersArray.length-1;
      }
  
      this.randomIndex --;
      this.presentable()
    
    }
  }
  rightClicked()
  {
    this.presentable()
  }
  scrollToAuctionSection(objFilter:any)
  { this.cd.detectChanges()
    this.objFilter = objFilter;
    this.auctionss.nativeElement.scrollIntoView();
    this.cd.detectChanges()
  }
  emitFilterObj(filterObj:any)
  {
    this.objFilter = filterObj;
    this.auctionss.nativeElement.scrollIntoView();
    this.cd.detectChanges()


  }

  auctioneerIdEmit(id:any)
  {
    this.auctioneers = this.auctioneersArray
 
    this.objFilterAuctioneer = {
      _id:id,
 
    }
    
    for(let [key, value] of Object.entries(this.objFilterAuctioneer))
    {
     
      this.auctioneersArray = this.auctioneersArray.filter((auction:any) => {
        return auction[key].toLowerCase() === value
      })
    }
    this.presentable()
    this.filter = true;
    this.cd.detectChanges();
    this.auctioneersss.nativeElement.scrollIntoView();    
  }

  objFilterAuctioneer !:any;
  objFilterAuctions !:any;
  emitUsername(type
    :any)
  {
    this.auctioneers = this.auctioneersArray
 
    this.objFilterAuctioneer = {
      username: type.username.toLowerCase(),
      bussinessType: type.bussinessType.toLowerCase()
    }
    
    for(let [key, value] of Object.entries(this.objFilterAuctioneer))
    {
     
      this.auctioneersArray = this.auctioneersArray.filter((auction:any) => {
        return auction[key].toLowerCase() === value
      })
    }
    this.presentable()
    this.filter = true;
    this.cd.detectChanges();
    this.auctioneersss.nativeElement.scrollIntoView();
    
  }
   

  emitAuctionCategory(category:any)
  {

      
      this.objFilter = category;
      this.auctionss.nativeElement.scrollIntoView();
      this.cd.detectChanges()
     
      this.auctionss.nativeElement.scrollIntoView()
  }

  
}
