import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
   @Input() type!:any;
   @Input() username!:any;

   @Output() password: EventEmitter<Object> = new EventEmitter<Object>();

  changePassword= new FormGroup(
    {

      password:new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('',  [Validators.required, Validators.minLength(8)])
    }
  )
  constructor() { }

  ngOnInit(): void {
  }
  get f()
{
    return this.changePassword.controls;
}
submit()
{
  
 this.password.emit(this.changePassword.controls['password'].value) 
}
}
