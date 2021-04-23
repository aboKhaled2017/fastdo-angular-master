import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrugListComponent } from './add-drug-list.component';

describe('AddDrugListComponent', () => {
  let component: AddDrugListComponent;
  let fixture: ComponentFixture<AddDrugListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDrugListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrugListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
