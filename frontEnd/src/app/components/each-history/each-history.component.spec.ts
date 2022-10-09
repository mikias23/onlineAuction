import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachHistoryComponent } from './each-history.component';

describe('EachHistoryComponent', () => {
  let component: EachHistoryComponent;
  let fixture: ComponentFixture<EachHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
