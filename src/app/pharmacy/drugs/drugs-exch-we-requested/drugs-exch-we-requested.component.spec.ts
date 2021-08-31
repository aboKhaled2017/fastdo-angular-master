import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsExchWeRequestedComponent } from './drugs-exch-we-requested.component';

describe('DrugsExchWeRequestedComponent', () => {
  let component: DrugsExchWeRequestedComponent;
  let fixture: ComponentFixture<DrugsExchWeRequestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsExchWeRequestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsExchWeRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
