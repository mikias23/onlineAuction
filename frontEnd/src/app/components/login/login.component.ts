import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



var config =  {

    apiKey: "AIzaSyBMUXse8RrtOUwhqXmL8sDk4hImFRQ6aM4",
    authDomain: "house-rent-refined.firebaseapp.com",
    projectId: "house-rent-refined",
    storageBucket: "house-rent-refined.appspot.com",
    messagingSenderId: "712274428642",
    appId: "1:712274428642:web:f390dfd9811168ee52d4bb",
    measurementId: "G-ZBZ54NM697"
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
passwordChangeAgentId = '';
  forgetPassword = false;
  codeSent = false;
  username = '';
  verify = '';
  phoneNumber = '';
  reCaptchaVerifier!:any;
  userType = 'bidder';

  constructor(private flashMessage: FlashMessagesService, private mainService: MainServiceService, private router : Router) { }

  ngOnInit(): void {
    firebase.initializeApp(config);
  }
  loginForm = new FormGroup(
    {

      username:new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('',  [Validators.required, Validators.minLength(8)]),
      type:new FormControl('bidder', [Validators.required])
    }
  )
  get f()
  {
      return this.loginForm.controls;
  }
  login()
  {
    this.mainService.login(this.loginForm.value).subscribe((result:any) => {
      if(result.success)
      {
        this.mainService.storeUserData(result.token, result.user, result.userType);
        this.flashMessage.show(result.msg, {cssClass: 'alert-success', timeout: 3000});
        
        window.scrollTo(0, 0);

        
         setTimeout(() => {
          if(result.userType === 'bidder')
          {
            this.router.navigate(['/'])
  
          }
          else if(result.userType === 'auctioneer')
          {
            this.router.navigate(['/'])
          }
          else {
            this.router.navigate(['/'])
          }
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
 
  toggleForgetPassword()
  {
    this.forgetPassword = !this.forgetPassword;
    this.codeSent = false;
  }

  phoneFromOtp(phone:any)
  {

    this.userType = this.loginForm.controls['type'].value; 
    console.log('phone', phone)
    this.mainService.phoneAuthentication(phone, this.userType).subscribe((data:any) => {
    if(data.success)
    {         
      this.username = data.username;
      this.phoneNumber = phone;
      this.phoneNumber =  (this.phoneNumber).substring(1);
      this.phoneNumber =      '+251' + this.phoneNumber;
      this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size:'invisible'
      })
    
      firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier).then((confirmationResult) => {
           localStorage.setItem('verificationId', JSON.stringify(confirmationResult.verificationId));
           this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}')
           this.codeSent = true;
           this.forgetPassword = false;
           console.log(this.verify)

      }).catch((error) => {
        alert(error.message);
        setTimeout(() => {
           window.location.reload();
    
        }, 2000)
      })
    this.passwordChangeAgentId = data.id
    }
    else 
    {

      this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      window.scroll(0,0)
        

    }
  })

  }
  addNewPassword = false;
  codeFromOtp(code:any)
  {
    var credentials = firebase.auth.PhoneAuthProvider.credential(this.verify, code)

    firebase.auth().signInWithCredential(credentials).then((response:any) => {
      this.addNewPassword = true;

      this.codeSent = false;
      
      localStorage.removeItem('verificationId');
    })
  }

  password(password:any)
  {
    let sendData = {
      password: password,
      type:this.userType,
      id: this.passwordChangeAgentId
    }

    this.mainService.changePassword(sendData).subscribe((data:any) => {
      if(data.success)
      {
        this.addNewPassword = false;
        this.flashMessage.show(data.msg, {
          cssClass:'alert-success',
          timeout:5000
        })
      }
      else {
        this.flashMessage.show(data.msg, {
          cssClass:'alert-danger',
          timeout:5000
        })
      }
    })
  }

}
