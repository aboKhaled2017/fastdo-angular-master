import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAsPharmacyStep4Component } from './join-as-pharmacy-step4.component';

describe('JoinAsPharmacyStep4Component', () => {
  let component: JoinAsPharmacyStep4Component;
  let fixture: ComponentFixture<JoinAsPharmacyStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinAsPharmacyStep4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAsPharmacyStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
