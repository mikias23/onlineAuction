import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionEventComponent } from './auction-event.component';

describe('AuctionEventComponent', () => {
  let component: AuctionEventComponent;
  let fixture: ComponentFixture<AuctionEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
