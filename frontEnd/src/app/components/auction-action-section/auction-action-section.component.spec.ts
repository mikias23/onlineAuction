import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionActionSectionComponent } from './auction-action-section.component';

describe('AuctionActionSectionComponent', () => {
  let component: AuctionActionSectionComponent;
  let fixture: ComponentFixture<AuctionActionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionActionSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionActionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
