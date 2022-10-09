import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAuctionsComponent } from './filter-auctions.component';

describe('FilterAuctionsComponent', () => {
  let component: FilterAuctionsComponent;
  let fixture: ComponentFixture<FilterAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAuctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
