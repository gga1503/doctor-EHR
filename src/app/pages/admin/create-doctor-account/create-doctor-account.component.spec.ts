import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDoctorAccountComponent } from './create-doctor-account.component';

describe('CreateDoctorAccountComponent', () => {
  let component: CreateDoctorAccountComponent;
  let fixture: ComponentFixture<CreateDoctorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDoctorAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDoctorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
