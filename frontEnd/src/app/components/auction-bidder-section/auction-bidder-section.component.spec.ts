import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionBidderSectionComponent } from './auction-bidder-section.component';

describe('AuctionBidderSectionComponent', () => {
  let component: AuctionBidderSectionComponent;
  let fixture: ComponentFixture<AuctionBidderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionBidderSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionBidderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
