import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsCreateComponent } from './records-create.component';

describe('RecordsCreateComponent', () => {
  let component: RecordsCreateComponent;
  let fixture: ComponentFixture<RecordsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
