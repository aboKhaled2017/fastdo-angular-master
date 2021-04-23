import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAsPharmacyStep2Component } from './join-as-pharmacy-step2.component';

describe('JoinAsPharmacyStep2Component', () => {
  let component: JoinAsPharmacyStep2Component;
  let fixture: ComponentFixture<JoinAsPharmacyStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinAsPharmacyStep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAsPharmacyStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
