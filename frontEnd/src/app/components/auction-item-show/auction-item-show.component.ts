import { Component, OnInit , Input} from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-auction-item-show',
  templateUrl: './auction-item-show.component.html',
  styleUrls: ['./auction-item-show.component.scss']
})
export class AuctionItemShowComponent implements OnInit {

  faArrowLeft= faArrowLeft;
  faArrowRight = faArrowRight;
  
  checkImageLength = 0;
   @Input() auction!:any;
   itemIndex = 0
   itemInfo = {
    brand:new Array(),
    imagePath:new Array(),
    name:new Array(),
    quantity:new Array(),
    price: new Array(),
    condition:new Array()
   }
  constructor() { }

  ngOnInit(): void {
   this.itemInfo.brand = this.auction.brand;
   this.itemInfo.imagePath = this.auction.itemImagePath;
   this.itemInfo.name = this.auction.name;
   this.itemInfo.quantity = this.auction.quantity;
   this.itemInfo.price = this.auction.itemPrices;
   this.itemInfo.condition = this.auction.condition;
   this.checkImageLength = this.itemInfo.imagePath.length;
  }
  fakeArray()
  {
    return new Array(this.itemInfo.brand.length)
  }
  
  slideLeft()
  {
    if(this.itemIndex == 0)
    {
      this.itemIndex = this.itemInfo.price.length -1
    }
    else {
      this.itemIndex -=1
    }
  }
  slideRight()
  {
    console.log(this.itemIndex)
    if(this.itemIndex == this.itemInfo.price.length - 1)
    {
      this.itemIndex = 0
    }
    else {
      this.itemIndex +=1
    }
  }
}
