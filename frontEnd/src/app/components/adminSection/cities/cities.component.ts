import { Component, OnInit,Output, EventEmitter, Input,   ChangeDetectorRef, OnChanges, SimpleChanges} from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
export interface PeriodicElement {
  image: string;
  city:string;
  delete:string;

}
var ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, OnChanges {
  faTrashAlt = faTrashAlt;
  @Output() deleteCity: EventEmitter<Object> = new EventEmitter<Object>();
  imgSrc = '';
  image !:any;
  @Input() cities = new Array()
  @Output() cityFormEmit: EventEmitter<Object> = new EventEmitter<Object>();

  dataSource = ELEMENT_DATA ;
  displayedColumns: string[] = ['image','city', 'delete'];
  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cities'].firstChange)
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
    this.dataSource = [];
    ELEMENT_DATA = []
    this.cities.forEach((city:any) => {
   
      ELEMENT_DATA.push({

        image: city.cityImagePath, city: city.city,
        delete:city._id
      })
    })
    this.dataSource = ELEMENT_DATA;
  }
  cityForm = new FormGroup(
    {
      city:new FormControl('', [Validators.required, Validators.minLength(3)])
    })
    get f()
    {
        return this.cityForm.controls;
    }
    saveCity()
    {

      let obj = {
        city: this.cityForm.controls['city'].value,
        image:this.image
      }
      this.cityFormEmit.emit(obj)
     
    }
    
  onAddImage(event:any)
  {
    const reader:any = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);  
 
     reader.onload = () => {
       this.imgSrc = reader.result as string;
    
       this.image =(event.target.files[0]);

         
     }
    }
  
  }

  delete(id:any)
  {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {type: 'confirm', message:'Are You Sure You want to to delete city?'}});

    dialogRef.afterClosed().subscribe((result:any) => {
  
      if(result === 'true')
      {
        this.deleteCity.emit(id);
   
      }
  
    })

  }

}
