import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEhrPageComponent } from './list-ehr-page.component';

describe('ListEhrPageComponent', () => {
  let component: ListEhrPageComponent;
  let fixture: ComponentFixture<ListEhrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEhrPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEhrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
