import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsShowListComponent } from './drugs-show-list.component';

describe('DrugsShowListComponent', () => {
  let component: DrugsShowListComponent;
  let fixture: ComponentFixture<DrugsShowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsShowListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
