import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsDisplayComponent } from './auctions-display.component';

describe('AuctionsDisplayComponent', () => {
  let component: AuctionsDisplayComponent;
  let fixture: ComponentFixture<AuctionsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
