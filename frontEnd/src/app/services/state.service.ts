import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StateService {


  private subject = new Subject<any>();
  
  sendFilter(message:any)
  {
    console.log(message)

    this.subject.next(message)
  }
  receiveFilter():Observable<string>{
    console.log(this.subject)
    return this.subject.asObservable();
  }

  constructor() { }

}
