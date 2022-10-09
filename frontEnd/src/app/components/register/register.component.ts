import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showAuctioneerType = false;
  imgSrc = '';
  image !:any;
  bussinessType = 'private';
  constructor(private flashMessage: FlashMessagesService, private mainService: MainServiceService) { }

  registerForm = new FormGroup(
    {
      firstName:new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName:new FormControl('', [Validators.required , Validators.minLength(3) ]),
      username:new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('',  [Validators.required, Validators.minLength(8)]),

      phone : new FormControl('',  [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      type: new FormControl('bidder', [Validators.required]),
      email:new FormControl('', [Validators.required]),
 
      
     }
  )
  ngOnInit(): void {
  }
  get f()
  {
      return this.registerForm.controls;
  }
  register()
  {
    this.mainService.registerUser(this.registerForm.value, this.image).subscribe((result:any) => {
      if(result.success)
      {
         this.flashMessage.show(result.msg, {
           cssClass: 'alert-success',
           timeout: 2000
         })
         window.scrollTo(0, 0);
         setTimeout(() => {
     
         }, 2000);
         
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
  onTypeChange(value:any)
  {
     if(value === 'bidder')
     {
      this.showAuctioneerType = false;
      this.registerForm.removeControl('bussinessType');
     }
     else {

      this.showAuctioneerType = true;
      this.registerForm.addControl('bussinessType', new FormControl('private', Validators.required)); 

     }
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
