import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAsPharmacyStep3Component } from './join-as-pharmacy-step3.component';

describe('JoinAsPharmacyStep3Component', () => {
  let component: JoinAsPharmacyStep3Component;
  let fixture: ComponentFixture<JoinAsPharmacyStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinAsPharmacyStep3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAsPharmacyStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
