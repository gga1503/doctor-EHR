import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiphersTableComponent } from './ciphers.table.component';

describe('CiphersTableComponent', () => {
  let component: CiphersTableComponent;
  let fixture: ComponentFixture<CiphersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiphersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiphersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
