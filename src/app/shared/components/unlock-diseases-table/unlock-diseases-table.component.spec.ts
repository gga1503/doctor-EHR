import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockDiseasesTableComponent } from './unlock-diseases-table.component';

describe('UnlockDiseasesTableComponent', () => {
  let component: UnlockDiseasesTableComponent;
  let fixture: ComponentFixture<UnlockDiseasesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockDiseasesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockDiseasesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
