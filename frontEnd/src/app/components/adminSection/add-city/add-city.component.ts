import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {
  imgSrc = '';
  image !:any;
  @Output() addCity: EventEmitter<Object> = new EventEmitter<Object>();
  constructor() { }
  cityForm = new FormGroup(
    {
      city:new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  ngOnInit(): void {
  }
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
    this.addCity.emit(obj)
   
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

}
