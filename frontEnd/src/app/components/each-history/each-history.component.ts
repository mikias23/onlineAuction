import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {faLeaf, faStar} from '@fortawesome/free-solid-svg-icons';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-each-history',
  templateUrl: './each-history.component.html',
  styleUrls: ['./each-history.component.scss']
})
export class EachHistoryComponent implements OnInit {
  @Output() auctioneerIdEmit: EventEmitter<Object> = new EventEmitter<Object>();

  faStar = faStar;
  faEye = faEye
  ;ratedNo = 0;
  styleOrange = { width: '50px'}
  @Input() auction!:any;
  subscribersRatings = new Array()
  ratingsSum  = -1;
 comments =new Array();
 arrayStar = [faStar, faStar, faStar, faStar, faStar];
 percentRate !:any;
  constructor(private router:Router) { }

  ngOnInit(): void {

    this.subscribersRatings = this.auction.ratings;

    let x = 5;

    if(this.subscribersRatings)
    {
      this.ratingsSum++
      let i = 0 
      this.subscribersRatings.forEach((rating:any)=> {
        i++;
          this.ratedNo++;
              this.ratingsSum = this.ratingsSum + rating.rating;
              this.comments.push(rating.comment)
      })
      this.ratingsSum = this.ratingsSum / i;

      this.percentRate = `${this.ratingsSum}%`
    }
    else {
      
    }

  }
  viewDetail()
  {
     
    localStorage.setItem('auction', JSON.stringify(this.auction));
    this.router.navigate(['/viewAuction'])
  }

  seeAuctioneer(id:any)
  {
    this.auctioneerIdEmit.emit(this.auction.auctioneerId)
  }

  showComment = false

  seeComments()
  {
    this.showComment = !this.showComment
  }
}
