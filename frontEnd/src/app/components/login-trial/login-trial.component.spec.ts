import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTrialComponent } from './login-trial.component';

describe('LoginTrialComponent', () => {
  let component: LoginTrialComponent;
  let fixture: ComponentFixture<LoginTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTrialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
