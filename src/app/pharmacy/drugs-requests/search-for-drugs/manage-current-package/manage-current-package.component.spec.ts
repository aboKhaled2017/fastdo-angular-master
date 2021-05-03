import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCurrentPackageComponent } from './manage-current-package.component';

describe('ManageCurrentPackageComponent', () => {
  let component: ManageCurrentPackageComponent;
  let fixture: ComponentFixture<ManageCurrentPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCurrentPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCurrentPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
