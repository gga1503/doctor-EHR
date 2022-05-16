import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpScanQrComponent } from './pop-up-scan-qr.component';

describe('PopUpScanQrComponent', () => {
  let component: PopUpScanQrComponent;
  let fixture: ComponentFixture<PopUpScanQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpScanQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpScanQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
