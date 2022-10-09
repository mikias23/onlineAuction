import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  faSearch = faSearch;
   typeSelected = 'government';
  username = '';
  @Output() emitUsername: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() emitAuctionCategory: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() { }

  ngOnInit(): void {
  }



  goTo()
  {

  }
  
  typeSwitched(type:any)
  {
     this.typeSelected = type;
  }

  userInput(username:any)
  {
    this.username = username.target.value  
    console.log(username.target.value  )
  }

  search()
  {
    
    let obj = {
      username:this.username,
      bussinessType: this.typeSelected
    }
    this.emitUsername.emit(obj);
    console.log(obj)
   
  }
 emitAuctionCategoryFunc(type:any)
  {
    
    let obj = {
      category: type
    }
    this.emitAuctionCategory.emit(obj);
    console.log(obj)
   
  }

  auctionsArrayLength = 0 ;
  auctioneersArrayLength = 0 ;
  biddersArrayLength = 0 ;

  auctioneers(value:any)
  {
    this.auctioneersArrayLength = value.length
  }
  auctions(value:any)
  {
    this.auctionsArrayLength= value.length
  }
  bidders(value:any)
  {
    this.biddersArrayLength = value.length
  }
}
