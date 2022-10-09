import { Component, OnInit } from '@angular/core';
import { MainServiceService } from './services/main-service.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  faCoffee = faCoffee;
  title = 'frontEnd';
  loginOrRegister = '';
  loginOrRegisterChecked(eventt:any)
  {
     this.loginOrRegister = eventt;
  }
  constructor(private mainService: MainServiceService)
  {
  
  }
  ngOnInit()
  {
    this.mainService.loadToken();

  }

}
