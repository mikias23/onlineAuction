import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBidComponent } from './top-bid.component';

describe('TopBidComponent', () => {
  let component: TopBidComponent;
  let fixture: ComponentFixture<TopBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
