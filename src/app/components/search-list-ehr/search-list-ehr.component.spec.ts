import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListEhrComponent } from './search-list-ehr.component';

describe('SearchListEhrComponent', () => {
  let component: SearchListEhrComponent;
  let fixture: ComponentFixture<SearchListEhrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchListEhrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListEhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
