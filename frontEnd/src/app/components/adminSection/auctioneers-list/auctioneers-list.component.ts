import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { faEye } from '@fortawesome/free-solid-svg-icons';import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';




export interface PeriodicElement {
  image: string;
  type: string;
  phone: string;
  email:string;
  approve:boolean;
  delete: string;


}

var ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-auctioneers-list',
  templateUrl: './auctioneers-list.component.html',
  styleUrls: ['./auctioneers-list.component.scss']
})
export class AuctioneersListComponent implements OnInit, OnChanges {
  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  faCheckCircle = faCheckCircle;
  @Input() auctioneers = new Array();

  @Output() deleteUser: EventEmitter<Object> = new EventEmitter<Object>();
  dataSource = ELEMENT_DATA ;
  displayedColumns: string[] = ['image','type', 'phone', 'email','approve', 'delete'];

  @Output() approveAuctioneer: EventEmitter<Object> = new EventEmitter<Object>();


  constructor(public dialog: MatDialog,private cd: ChangeDetectorRef) { }
  ngOnChanges(changes:SimpleChanges)
  {
    if(changes['auctioneers'].firstChange)
    {
      return ;
    }
    

     this.fill()
  
  
  }
  ngOnInit(): void {
    
this.fill()
  }

  fill()
  {
    ELEMENT_DATA = []
    this.dataSource = []
    this.auctioneers.forEach((auctioneer:any) => {
   
      ELEMENT_DATA.push({

        image: auctioneer.profilePicPath, type: auctioneer.bussinessType , phone:auctioneer.phone,
        email:auctioneer.email,
        approve: auctioneer.approved,
        delete:auctioneer._id
      })
    })
    this.dataSource = ELEMENT_DATA;
  }
  delete(id:any)
  {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to to delete Auctioneer and associated auctions ?'}});

    dialogRef.afterClosed().subscribe((result:any) => {
  
      if(result === 'true')
      {
     
         
        let objDelete = {
          type:'auctioneer',
          id:id
        }
        this.deleteUser.emit(objDelete);

            
      }
  
    })


  }
  approve(approve:any, id:any)
  {
   console.log('asasasasas')
   this.auctioneers.forEach((auction:any, index) => {
     if(auction._id === id )
     {
        this.dataSource[index].approve = !this.dataSource[index].approve
     }
 })

 let approveObj = {
   approved: !approve,
   id:id
 }
 console.log(approveObj)
 this.approveAuctioneer.emit(approveObj)

  }
  

  }



