import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-slider-right',
  templateUrl: './slider-right.component.html',
  styleUrls: ['./slider-right.component.scss']
})
export class SliderRightComponent implements OnInit {

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  @Input() type!:any;
  @Output()  rightEmit: EventEmitter<Object> = new EventEmitter<Object>();
  
  @Output()  leftEmit: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() { }

  ngOnInit(): void {
  }

  leftClicked()
  {
   this.leftEmit.emit()
  }
  rightClicked()
  {
    this.rightEmit.emit()

  }



}
