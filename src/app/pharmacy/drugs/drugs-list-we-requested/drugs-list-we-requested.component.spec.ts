import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsListWeRequestedComponent } from './drugs-list-we-requested.component';

describe('DrugsListWeRequestedComponent', () => {
  let component: DrugsListWeRequestedComponent;
  let fixture: ComponentFixture<DrugsListWeRequestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsListWeRequestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsListWeRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
