import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-each-auctioneer',
  templateUrl: './each-auctioneer.component.html',
  styleUrls: ['./each-auctioneer.component.scss']
})
export class EachAuctioneerComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  @Input() auctions!:any;
  @Input() auctioneer!:any;
  @Input() objFilterAuctioneer!:any;

  @Output() scrollToAuctionSection: EventEmitter<Object> = new EventEmitter<Object>();
  auctionNumbers = 0
  constructor() { }
  faEye = faEye;
  ngOnInit(): void {
  this.auctions.forEach((auction:any) => {
    if(auction.auctioneerId === this.auctioneer._id)
    {
      this.auctionNumbers++
    }

  })
  }

  filterObj !:any
  ScrollToAuction()
  {
    this.filterObj = {auctioneerId: this.auctioneer._id}
    this.scrollToAuctionSection.emit(this.filterObj)
  }



}
