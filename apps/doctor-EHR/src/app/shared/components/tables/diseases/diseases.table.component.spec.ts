import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasesTableComponent } from './diseases.table.component';

describe('UnlockDiseasesTableComponent', () => {
  let component: DiseasesTableComponent;
  let fixture: ComponentFixture<DiseasesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseasesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
