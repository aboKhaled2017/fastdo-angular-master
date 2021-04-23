import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugTableDetailsComponent } from './drug-table-details.component';

describe('DrugTableDetailsComponent', () => {
  let component: DrugTableDetailsComponent;
  let fixture: ComponentFixture<DrugTableDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugTableDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugTableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
