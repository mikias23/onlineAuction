import { Component, OnInit,Output, EventEmitter, Input,   ChangeDetectorRef, OnChanges, SimpleChanges} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
export interface PeriodicElement {
  image: string;
  ItemType: string;
  see: string;
  delete: string;

}

var ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit , OnChanges {
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;
  faCheck = faCheck;
  faEye = faEye;
  @Input() auctionsHist = new Array();
  @Output() deleteAuctionHist: EventEmitter<Object> = new EventEmitter<Object>();

  dataSource = ELEMENT_DATA ;
  displayedColumns: string[] = ['image','ItemType', 'see',  'delete'];
  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
  
    console.log(this.auctionsHist)
   this.fill()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['auctionsHist'].firstChange)
    {
      return ;
    }
    
  
    this.fill()
  }
  fill()
  {
    ELEMENT_DATA = []
    this.dataSource = []
    this.auctionsHist.forEach((auction:any) => {
   
      ELEMENT_DATA.push({

        image: auction.itemImagePath[0], ItemType: auction.category , see:auction._id, 
        delete:auction._id
      })
    })
    this.dataSource = ELEMENT_DATA;
    console.log(this.dataSource);
  
  }

  delete(id:any)
  {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to to delete Auction History?'}});

    dialogRef.afterClosed().subscribe((result:any) => {
  
      if(result === 'true')
      {
        this.deleteAuctionHist.emit(id);
   
      }
  
    })

  }

  seeAuction(id:any)
  {
    this.auctionsHist.forEach((auction:any) => {
      if(auction._id === id)
      {
        localStorage.setItem('auction', JSON.stringify(auction));
        this.router.navigate(['/viewAuction'])
      }
    })

  }
}
