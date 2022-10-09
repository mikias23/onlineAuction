import { Component, Input, OnInit,ChangeDetectorRef, OnChanges, SimpleChanges  } from '@angular/core';
import { faAngleDoubleDown, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-auctions-display',
  templateUrl: './auctions-display.component.html',
  styleUrls: ['./auctions-display.component.scss']
})
export class AuctionsDisplayComponent implements OnInit,  OnChanges {
  auctionsArrayStore = new Array();
  auctionArrayOriginal = new Array()
  auctionsArray = new Array();
  auctionsArrayForShow = new Array();
  faAngleDoubleLeft = faAngleDoubleLeft;
  @Input() filter!:any;
  
  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges(changes:SimpleChanges)
  {
    if(changes['filter'].firstChange)
    {
      return ;
    } 
    this.doFilter()
  
  }
  auctions(auctions:any)
  {
    this.auctionsArrayStore = auctions;
    this.auctionArrayOriginal = auctions;
    this.randomIndex =  Math.round(Math.random()* this.auctionsArrayStore.length-1);

       this.doFilter()

  }

  doFilter()
  {
    console.log(this.filter)
    this.auctionsArrayStore = this.auctionArrayOriginal;

    if(this.filter )
    {

     for(let [key, value] of Object.entries(this.filter))
     {
       this.auctionsArrayStore = this.auctionsArrayStore.filter((auction:any) => {
         return auction[key] === value
       })
     }
    }
    else {
      this.auctionsArrayStore = this.auctionArrayOriginal
    }

    this.presentable()



  }

  randomIndex !:any
  presentable()
  {
 
  
 
    if(this.auctionsArrayStore.length > 8)
    { 
      this.auctionsArray = []
 
              for(let i = 0 ; i < 8; i++)
              {
               this.auctionsArray.push( this.auctionsArrayStore[this.randomIndex])
               this.randomIndex++;
               if(this.auctionsArrayStore.length  === this.randomIndex)
               {
                 this.randomIndex = 0
               }

              }
    }
    else {
           this.auctionsArray = this.auctionsArrayStore;
    }

 

  }
  allAuction()
  {
   this.filter = null;
   this.auctionsArrayStore = this.auctionArrayOriginal;

   
   this.presentable();
  }
  leftClicked()
  {

  for(let i = 0 ; i < 6; i++)
  {
    if(this.randomIndex == 0)
    {
      this.randomIndex = this.auctionsArrayStore.length-1;
    }

    this.randomIndex --;
    this.presentable()
  
  }
  }
  rightClicked()
  {

    this.presentable()

  }

}
