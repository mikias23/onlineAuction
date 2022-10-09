import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Output() addCategory: EventEmitter<Object> = new EventEmitter<Object>();

  categoryForm = new FormGroup(
    {
name:new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  constructor() { }

  ngOnInit(): void {
  }
  saveCity()
  {


    this.addCategory.emit(this.categoryForm.value)
   
  }

}
