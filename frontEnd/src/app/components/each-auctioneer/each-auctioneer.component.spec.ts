import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachAuctioneerComponent } from './each-auctioneer.component';

describe('EachAuctioneerComponent', () => {
  let component: EachAuctioneerComponent;
  let fixture: ComponentFixture<EachAuctioneerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachAuctioneerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachAuctioneerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
