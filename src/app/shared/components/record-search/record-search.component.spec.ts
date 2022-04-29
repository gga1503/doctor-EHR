import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSearchComponent } from './record-search.component';

describe('SearchListEhrComponent', () => {
  let component: RecordSearchComponent;
  let fixture: ComponentFixture<RecordSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
