import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmasRequestsComponent } from './pharmas-requests.component';

describe('PharmasRequestsComponent', () => {
  let component: PharmasRequestsComponent;
  let fixture: ComponentFixture<PharmasRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmasRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmasRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
