import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HTabeComponent } from './h-tabe.component';

describe('HTabeComponent', () => {
  let component: HTabeComponent;
  let fixture: ComponentFixture<HTabeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HTabeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HTabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
