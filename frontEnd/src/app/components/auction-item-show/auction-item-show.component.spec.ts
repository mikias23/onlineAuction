import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionItemShowComponent } from './auction-item-show.component';

describe('AuctionItemShowComponent', () => {
  let component: AuctionItemShowComponent;
  let fixture: ComponentFixture<AuctionItemShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionItemShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionItemShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
