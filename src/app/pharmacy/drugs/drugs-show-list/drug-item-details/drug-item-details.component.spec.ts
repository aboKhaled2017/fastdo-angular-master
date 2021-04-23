import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugItemDetailsComponent } from './drug-item-details.component';

describe('DrugItemDetailsComponent', () => {
  let component: DrugItemDetailsComponent;
  let fixture: ComponentFixture<DrugItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
