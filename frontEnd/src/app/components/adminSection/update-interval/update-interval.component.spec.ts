import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIntervalComponent } from './update-interval.component';

describe('UpdateIntervalComponent', () => {
  let component: UpdateIntervalComponent;
  let fixture: ComponentFixture<UpdateIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
