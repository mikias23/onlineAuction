import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControlName, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() user!:any;
  @Input() type!:any;
  @Output() NewUser: EventEmitter<Object> = new EventEmitter<Object>();

  edit  = new Array(6).fill(false);
  submit = false;
  constructor(private flashMessage: FlashMessagesService, private mainService: MainServiceService) { }

  ngOnInit(): void {
  }
  editForm= new FormGroup(
    {
     id:new FormControl(''),
     username: new FormControl('')
,
     email:new FormControl(''),
     firstName:new FormControl(''),
     lastName:new FormControl(''),
     type:new FormControl(''),
     password:new FormControl(''),
     confirmPassword:new FormControl(''),
  
    }
  ) 

  displayableFields = [
    'email', 'firstName' , 'username','lastName', 'password', 'confirmPassword', 
  ]
 

toggle(field:any, i:any)
{
  this.submit = false

  if(!this.edit[i])
  {
    this.editForm.removeControl(`${field}`); 

    if(field === 'phone' )
    {
      this.editForm.addControl(`${field}`, new FormControl(``, [Validators.required, Validators.minLength(10),  Validators.maxLength(10)])); 
    }
    else if(field === 'firstName' || field === 'lastName') {
      this.editForm.addControl(`${field}`, new FormControl(``, [Validators.required, Validators.minLength(3)])); 
    }
    else if(field == 'username') {
      this.editForm.addControl(`${field}`, new FormControl(``, [Validators.required, Validators.minLength(8)])); 
    }
    else {
      this.editForm.addControl(`${field}`, new FormControl(``, [Validators.required, Validators.minLength(8)])); 
    }
   
  }
  else {
    this.editForm.removeControl(`${field}`); 
  }

  this.edit[i] = !this.edit[i];
  this.edit.forEach((e:any) => {
    if(e == true)
    {
      console.log(this.edit)
      this.submit = true
    }
  })


}
submitEdit()
{
 
  if(this.edit[4])
  {
    if(this.editForm.controls['password'].value !== this.editForm.controls['confirmPassword'].value)
    {
      this.flashMessage.show('passwords does not match', {
        cssClass: 'alert-danger',
        timeout: 2000
      });
      return
    }

  }

    this.editForm.patchValue({'id':this.user._id})
    this.editForm.patchValue({'type':this.type}) 
    
this.mainService.editUser((this.editForm.value)).subscribe((result:any) => {
  if(result.success)
  {
    this.edit.fill(false);
    
    this.mainService.storeUserData(result.token, result.user, this.type);
    this.NewUser.emit(result.user);
     this.flashMessage.show(result.msg, {
       cssClass: 'alert-success',
       timeout: 2000
     })
     window.scrollTo(0, 0);
  
      
       
  }
  else {
    this.flashMessage.show(result.msg, {
      cssClass: 'alert-danger',
      timeout: 2000
    });
    window.scrollTo(0, 0);
    setTimeout(() => {
     
    }, 2000);
  }
})
  
  

  

}
}
