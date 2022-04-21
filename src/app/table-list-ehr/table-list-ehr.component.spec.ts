import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListEhrComponent } from './table-list-ehr.component';

describe('TableListEhrComponent', () => {
  let component: TableListEhrComponent;
  let fixture: ComponentFixture<TableListEhrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListEhrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListEhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
