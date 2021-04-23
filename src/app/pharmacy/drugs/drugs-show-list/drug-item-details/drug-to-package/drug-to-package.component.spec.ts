import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugToPackageComponent } from './drug-to-package.component';

describe('DrugToPackageComponent', () => {
  let component: DrugToPackageComponent;
  let fixture: ComponentFixture<DrugToPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugToPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugToPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
