import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAltComponent } from './login-alt.component';

describe('LoginAltComponent', () => {
  let component: LoginAltComponent;
  let fixture: ComponentFixture<LoginAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
