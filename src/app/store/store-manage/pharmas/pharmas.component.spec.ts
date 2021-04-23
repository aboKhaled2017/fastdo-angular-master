import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmasComponent } from './pharmas.component';

describe('PharmasComponent', () => {
  let component: PharmasComponent;
  let fixture: ComponentFixture<PharmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
