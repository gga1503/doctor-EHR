import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsDiseaseComponent } from './records-disease.component';

describe('RecordsDiseaseComponent', () => {
  let component: RecordsDiseaseComponent;
  let fixture: ComponentFixture<RecordsDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsDiseaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
