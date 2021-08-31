import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsExchWeReceivedComponent } from './drugs-exch-we-received.component';

describe('DrugsExchWeReceivedComponent', () => {
  let component: DrugsExchWeReceivedComponent;
  let fixture: ComponentFixture<DrugsExchWeReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsExchWeReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsExchWeReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
