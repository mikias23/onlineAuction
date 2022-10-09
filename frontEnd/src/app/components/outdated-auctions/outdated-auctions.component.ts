import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-outdated-auctions',
  templateUrl: './outdated-auctions.component.html',
  styleUrls: ['./outdated-auctions.component.scss']
})
export class OutdatedAuctionsComponent implements OnInit {

  @Input() auctioneerHistory !:any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.auctioneerHistory)
  }

}
