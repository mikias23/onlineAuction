import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

export interface PeriodicElement {
 name:string;
  delete:string;

}
var ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnChanges{
  faTrashAlt = faTrashAlt;
  @Output() deleteCategory: EventEmitter<Object> = new EventEmitter<Object>();

  @Input() categories !:any;
  dataSource = ELEMENT_DATA ;
  displayedColumns: string[] = ['name','delete'];

  constructor(public dialog: MatDialog,private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

   this.fill()
  }
  delete(id:any)
  {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to to delete category ?'}});

    dialogRef.afterClosed().subscribe((result:any) => {
  
      if(result === 'true')
      {
  
        this.deleteCategory.emit(id);

            
      }
  
    })


  }
  ngOnChanges(changes:SimpleChanges)
  {
    if(changes['categories'].firstChange)
    {
      return ;
    }
    
  
    this.fill()
    
  
  
  }
  fill()
  {
    ELEMENT_DATA = []
    this.dataSource = []
    this.categories.forEach((category:any) => {
   
      ELEMENT_DATA.push({
        name:category.name,
        delete: category._id
      })
    })
    this.dataSource = ELEMENT_DATA;
  }

}
