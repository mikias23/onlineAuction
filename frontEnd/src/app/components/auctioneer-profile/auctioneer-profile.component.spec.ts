import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctioneerProfileComponent } from './auctioneer-profile.component';

describe('AuctioneerProfileComponent', () => {
  let component: AuctioneerProfileComponent;
  let fixture: ComponentFixture<AuctioneerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctioneerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctioneerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
