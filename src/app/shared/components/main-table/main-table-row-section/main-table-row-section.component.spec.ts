import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTableRowSectionComponent } from './main-table-row-section.component';

describe('MainTableRowSectionComponent', () => {
  let component: MainTableRowSectionComponent;
  let fixture: ComponentFixture<MainTableRowSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTableRowSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTableRowSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
