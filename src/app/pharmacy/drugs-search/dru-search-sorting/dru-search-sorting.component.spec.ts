import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DruSearchSortingComponent } from './dru-search-sorting.component';

describe('DruSearchSortingComponent', () => {
  let component: DruSearchSortingComponent;
  let fixture: ComponentFixture<DruSearchSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DruSearchSortingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DruSearchSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
