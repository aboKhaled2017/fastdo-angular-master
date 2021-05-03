import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsTableComponent } from './drugs-table.component';

describe('DrugsTableComponent', () => {
  let component: DrugsTableComponent;
  let fixture: ComponentFixture<DrugsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
