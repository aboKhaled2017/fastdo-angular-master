import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugSearchCardComponent } from './drug-search-card.component';

describe('DrugSearchCardComponent', () => {
  let component: DrugSearchCardComponent;
  let fixture: ComponentFixture<DrugSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugSearchCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
