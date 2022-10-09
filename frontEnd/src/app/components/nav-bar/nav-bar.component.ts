import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';
import { FlashMessagesService } from "flash-messages-angular";
import { Router } from '@angular/router';
import {faStream } from '@fortawesome/free-solid-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  faStream = faStream;
  faTimes = faTimes;
  constructor(public mainService: MainServiceService, private router: Router, private flashMessage:FlashMessagesService) { }
  links = false;


  toggleBtns()
  {

    this.links = !this.links
  }
  ngOnInit(): void {
  }
  userLoggedOut(){
    this.mainService.logOut();
    this.flashMessage.show('Logged Out', {
      cssClass:"alert-success",
      timeout: 3000
    })
    this.router.navigate(['/login']);
    return false;
  }

}
