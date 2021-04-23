import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugSearchFiltersComponent } from './drug-search-filters.component';

describe('DrugSearchFiltersComponent', () => {
  let component: DrugSearchFiltersComponent;
  let fixture: ComponentFixture<DrugSearchFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugSearchFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugSearchFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
