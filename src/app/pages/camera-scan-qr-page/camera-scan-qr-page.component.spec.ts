import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraScanQrPageComponent } from './camera-scan-qr-page';

describe('HomeComponent', () => {
  let component: CameraScanQrPageComponent;
  let fixture: ComponentFixture<CameraScanQrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraScanQrPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraScanQrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
