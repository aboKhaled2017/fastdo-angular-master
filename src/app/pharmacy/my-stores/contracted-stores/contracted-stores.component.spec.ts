import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractedStoresComponent } from './contracted-stores.component';

describe('ContractedStoresComponent', () => {
  let component: ContractedStoresComponent;
  let fixture: ComponentFixture<ContractedStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractedStoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractedStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
