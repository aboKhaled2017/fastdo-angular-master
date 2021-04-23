import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForDrugsComponent } from './search-for-drugs.component';

describe('SearchForDrugsComponent', () => {
  let component: SearchForDrugsComponent;
  let fixture: ComponentFixture<SearchForDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchForDrugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
