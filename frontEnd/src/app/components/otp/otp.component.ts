import { Component,Input,OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  otpCode= '';
  verifyCode = '';
  @Input() length!:any;
  @Input() type!:any;
  @Output() code: EventEmitter<Object> = new EventEmitter<Object>();

  @Output() phone: EventEmitter<Object> = new EventEmitter<Object>();
  constructor() { }
  config!:any;
  ngOnInit(): void {
    this.config = {
      allowedNumbersOnly: true,
      allowKeyCodes: Number,
      length:this.length,
      isPasswordInput: false,
      disableAutoFocus:false,
      placeholder:'',
      inputStyles: {
        width:'30px',
        height: '30px'

      },
    };
  }

 
  onOtpChange(otpCode:any)
  {
       this.otpCode = otpCode;
  }
  handleClick()
  {
    if(this.type !== 'code')
    {
      if(this.otpCode.length === 10)
      {
        var regExp = /[a-zA-Z]/g;
  
            if(regExp.test(this.otpCode)){
  
              prompt('Got String')
                 } else {
                  this.phone.emit(this.otpCode);
                  }
  
      }
      else {
        prompt('Less Chars')
      }
    }
    else {
      if(this.otpCode.length === 6)
      {
        this.code.emit(this.otpCode);
      }
      else {
        prompt('Less Chars')
      }
    }

  }
}
