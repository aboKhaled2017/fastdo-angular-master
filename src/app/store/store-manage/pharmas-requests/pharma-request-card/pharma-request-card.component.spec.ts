import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaRequestCardComponent } from './pharma-request-card.component';

describe('PharmaRequestCardComponent', () => {
  let component: PharmaRequestCardComponent;
  let fixture: ComponentFixture<PharmaRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaRequestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
