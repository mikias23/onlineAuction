import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachAuctionComponent } from './each-auction.component';

describe('EachAuctionComponent', () => {
  let component: EachAuctionComponent;
  let fixture: ComponentFixture<EachAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachAuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
