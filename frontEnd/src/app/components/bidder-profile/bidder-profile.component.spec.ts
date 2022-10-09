import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderProfileComponent } from './bidder-profile.component';

describe('BidderProfileComponent', () => {
  let component: BidderProfileComponent;
  let fixture: ComponentFixture<BidderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidderProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
