import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRequestsDrugCardComponent } from './store-requests-drug-card.component';

describe('StoreRequestsDrugCardComponent', () => {
  let component: StoreRequestsDrugCardComponent;
  let fixture: ComponentFixture<StoreRequestsDrugCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreRequestsDrugCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRequestsDrugCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
