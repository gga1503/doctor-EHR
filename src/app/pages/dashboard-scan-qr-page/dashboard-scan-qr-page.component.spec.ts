import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardScanQrPageComponent } from './dashboard-scan-qr-page.component';

describe('DashboardScanQrPageComponent', () => {
  let component: DashboardScanQrPageComponent;
  let fixture: ComponentFixture<DashboardScanQrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardScanQrPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardScanQrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
