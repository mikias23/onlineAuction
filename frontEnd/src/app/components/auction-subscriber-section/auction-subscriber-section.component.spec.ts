import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionSubscriberSectionComponent } from './auction-subscriber-section.component';

describe('AuctionSubscriberSectionComponent', () => {
  let component: AuctionSubscriberSectionComponent;
  let fixture: ComponentFixture<AuctionSubscriberSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionSubscriberSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionSubscriberSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
