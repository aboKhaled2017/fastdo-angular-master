import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingSectionComponent } from './paging-section.component';

describe('PagingSectionComponent', () => {
  let component: PagingSectionComponent;
  let fixture: ComponentFixture<PagingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
