import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControlName, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainServiceService } from 'src/app/services/main-service.service';
import {  FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-interval',
  templateUrl: './update-interval.component.html',
  styleUrls: ['./update-interval.component.scss']
})
export class UpdateIntervalComponent implements OnInit {

  @Input() updateIntervalValue !:any;
  
  hrModulo = 0;
  minModulo = 0;
  days = 0
  hrs = 0
  mins  = 0
  @Output() intervalFormEmit: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private flashMessage: FlashMessagesService, private mainService: MainServiceService, private router : Router) { }

  dirtyTog = false;
  updateIntervalForm = new FormGroup(
    {

      days:new FormControl('', [Validators.required]),
      hrs: new FormControl('',  [Validators.required]),
      mins:new FormControl('', [Validators.required])
    }
  )
  ngOnInit(): void {
   this.days = Math.floor(this.updateIntervalValue/(1000*60*60*24));
   this.hrModulo =  this.updateIntervalValue %  (1000*60*60*24);
   this.hrs = Math.floor(this.hrModulo/(1000*60*60)) 
   this.minModulo =  this.hrModulo %  (1000*60);
   this.mins = this.minModulo/(1000 * 60)

     this.updateIntervalForm.patchValue({
      days: this.days
     })
     this.updateIntervalForm.patchValue({
      hrs: this.hrs
     })
     this.updateIntervalForm.patchValue({
    mins: this.mins
     })
  }

  submit()
  {
           
    this.intervalFormEmit.emit(this.updateIntervalForm.value);
    this.updateIntervalForm.reset()
    this.updateIntervalForm.reset
  }
  dirtys()
  {
     this.dirtyTog = !this.dirtyTog
  }
}
