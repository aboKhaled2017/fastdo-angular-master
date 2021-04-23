import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugPackageStatusComponent } from './drug-package-status.component';

describe('DrugPackageStatusComponent', () => {
  let component: DrugPackageStatusComponent;
  let fixture: ComponentFixture<DrugPackageStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugPackageStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugPackageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
