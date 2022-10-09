import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";  
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  faCheck = faCheck;
  faDownload = faDownload;
  faTimesCircle = faTimesCircle;
  dateNow = new Date()
  utilities = [
    'Ethio Online Auction',
    'Passport Payment',
    'Ethioipian Electric Payment',
    'Ethiopian Airlines Ticket',
    'Ministry of Trade and Industry'
  ]
  balance = 13700;
  reciept = false;
  uploadFee = 0;
  account = ['1000******8907']
  verified = false ;
  auctioneer !:any;
  return()
  {
    this.router.navigate(['/auctioneerProfile'])
  }
  verifyCode = new FormGroup(
    {
            code:new FormControl('', [Validators.required, Validators.minLength(4)]),
            auctionId:new FormControl('')
    }
  )
  constructor(private flashMessage: FlashMessagesService, private mainService: MainServiceService, private router: Router, private stateService: StateService) { 

  }

  auctionId!:any
  ngOnInit(): void {
    this.auctionId = JSON.parse(localStorage.getItem('auctionId') || '{}');
   
  }
  public downloadAsPDF() {
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
     
  }
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

  get f()
  {
    return this.verifyCode.controls;
  }
  verifyCodeFunc()
  {
    this.verifyCode.patchValue({'auctionId': this.auctionId});

    this.mainService.validatePaymentCode(this.verifyCode.value).subscribe((result:any) => {
      if(result.success)
      {
          this.verified = true;
          this.verifyCode.reset();
          this.verifyCode.reset;
          this.uploadFee = result.uploadFee;
          console.log(this.uploadFee)

      }
      else {

      }
    })
  }


  makePayment()
  {
    console.log(this.auctionId)
    this.mainService.approvePayment(this.auctionId).subscribe((result:any)=> {
      if(result.success)
      {
       this.reciept = true;
       
      }

      else {

      }

    })
  }

}
