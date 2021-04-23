import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAsPharmacyStep1Component } from './join-as-pharmacy-step1.component';

describe('JoinAsPharmacyStep1Component', () => {
  let component: JoinAsPharmacyStep1Component;
  let fixture: ComponentFixture<JoinAsPharmacyStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinAsPharmacyStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAsPharmacyStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
