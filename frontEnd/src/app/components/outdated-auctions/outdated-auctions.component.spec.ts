import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdatedAuctionsComponent } from './outdated-auctions.component';

describe('OutdatedAuctionsComponent', () => {
  let component: OutdatedAuctionsComponent;
  let fixture: ComponentFixture<OutdatedAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutdatedAuctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutdatedAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
