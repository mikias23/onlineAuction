import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
export interface PeriodicElement {
  image: string;
  username: string;
  phone: string;
  email:string;
  delete: string;

}

var ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-bidders-list',
  templateUrl: './bidders-list.component.html',
  styleUrls: ['./bidders-list.component.scss']
})
export class BiddersListComponent implements OnInit, OnChanges {


  faTrashAlt = faTrashAlt;
  @Input() bidders =  new Array()


  @Output() deleteUser: EventEmitter<Object> = new EventEmitter<Object>();
  dataSource = ELEMENT_DATA ;
  displayedColumns: string[] = ['image','username', 'phone', 'email', 'delete'];
  constructor(public dialog: MatDialog,private cd: ChangeDetectorRef) { }
  ngOnChanges(changes:SimpleChanges)
  {
    if(changes['bidders'].firstChange)
    {
      return ;
    }
    

     this.fill()
  
  
  }
  fill()
  {
    ELEMENT_DATA = []
    this.dataSource = []
    this.bidders.forEach((bidder:any) => {
   
      ELEMENT_DATA.push({

        image: bidder.profilePicPath, username: bidder.username , phone:bidder.phone,
        email:bidder.email,
        delete:bidder._id
      })
    })
    this.dataSource = ELEMENT_DATA;
  }
  ngOnInit(): void {
  this.fill()

  }

  
  delete(id:any)
  {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to to bidder?'}});

    dialogRef.afterClosed().subscribe((result:any) => {
  
      if(result === 'true')
      {
     
         
    let objDelete = {
      type:'bidder',
      id:id
    }

    this.deleteUser.emit(objDelete); 

            
      }
  
    })

  }

}
