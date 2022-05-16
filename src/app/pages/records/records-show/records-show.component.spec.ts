import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsShowComponent } from './records-show.component';

describe('RecordsShowComponent', () => {
  let component: RecordsShowComponent;
  let fixture: ComponentFixture<RecordsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
