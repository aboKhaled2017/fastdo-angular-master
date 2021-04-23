import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugSearchResultComponent } from './drug-search-result.component';

describe('DrugSearchResultComponent', () => {
  let component: DrugSearchResultComponent;
  let fixture: ComponentFixture<DrugSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
