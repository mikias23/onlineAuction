import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faTag} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-filter-auctions',
  templateUrl: './filter-auctions.component.html',
  styleUrls: ['./filter-auctions.component.scss']
})
export class FilterAuctionsComponent implements OnInit {
  @Output() emitFilterObj: EventEmitter<Object> = new EventEmitter<Object>();
  faTags = faTags;
  faDollarSign = faDollarSign;
  faTag = faTag;
  faSearch = faSearch;
  faCity = faCity;
  currentTypeSelected = 0;
  citiesArray = new Array;
  categoriesArray = new Array();
  filterType = ['city', 'category', 'type',  'format']
  auctionType = ['all', 'normal', 'reverse'];
  auctionFormat = ['all', 'regular', 'live'];
  selectedIndex = [0,0,0,0];
  filterValue = new Array();

  constructor() { }

  ngOnInit(): void {
    this.citiesArray.push('all')
    this.categoriesArray.push('all');
    this.filterValue = this.citiesArray;
  }


  cities(citiesArray:any)
  {
    citiesArray.forEach((city:any) => {
      this.citiesArray.push(city.city)
    })
  }
  categories(categoriesArray:any)
  {
 categoriesArray.forEach((category:any) => {
        this.categoriesArray.push(category.name)
    })
  }
  changeValue(i:any, currentTypeSelected:any)
  {
    this.selectedIndex[currentTypeSelected]= i;
  }
  changeType(i:any)
  {
     this.currentTypeSelected = i;
     console.log(this.currentTypeSelected);
     switch(this.filterType[i])
     {
      case 'city':
        {

this.filterValue = this.citiesArray;
break;
        }
       case 'type':{
        this.filterValue = this.auctionType;
        
break;
       }
       case 'format': {
        this.filterValue = this.auctionFormat
  break;
       }
     
        case 'category': {
          this.filterValue = this.categoriesArray

          break;
        }
     }
  }

  arrayEmit = {

  }
  emitValuesWithType()
  {
    var objEmit :any = {

    }

    this.selectedIndex.forEach((val:any,index)=> {
      if(val !== 0)
      {
        let key,value
        if(index === 0)
        {
          key = 'city';
          value = this.citiesArray[val]; 
        }
        else if(index === 1)
        {
          key = 'category'
          value = this.categoriesArray[val]; 

        }
        else if(index === 2)
        {
          key = 'type'
          value = this.auctionType[val]; 

        }
 
        else 
        {
          key = 'format'
          value = this.auctionFormat[val]; 
      

        }

       objEmit[key]=value
      

              
      }
    })
    console.log(objEmit)
    this.emitFilterObj.emit(objEmit)
  }
}
