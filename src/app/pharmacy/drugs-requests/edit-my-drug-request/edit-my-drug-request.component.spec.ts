import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyDrugRequestComponent } from './edit-my-drug-request.component';

describe('EditMyDrugRequestComponent', () => {
  let component: EditMyDrugRequestComponent;
  let fixture: ComponentFixture<EditMyDrugRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyDrugRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyDrugRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
