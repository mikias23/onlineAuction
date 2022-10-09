import { Injectable } from "@angular/core";
import {Router, CanActivate} from '@angular/router'
import {MainServiceService} from '../services/main-service.service';
@Injectable()
export class AuthGuard implements CanActivate{

    constructor( private mainService: MainServiceService, private router: Router)

    {

    }

    canActivate(){

        if(this.mainService.loggedIn())
        {
            return true;
        }
        else {
            this.router.navigate(['/login'])
            return false;
        }
  
    }
}