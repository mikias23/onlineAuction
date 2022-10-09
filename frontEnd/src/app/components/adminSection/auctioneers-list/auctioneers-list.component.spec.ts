import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctioneersListComponent } from './auctioneers-list.component';

describe('AuctioneersListComponent', () => {
  let component: AuctioneersListComponent;
  let fixture: ComponentFixture<AuctioneersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctioneersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctioneersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
