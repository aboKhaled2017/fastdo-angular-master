import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRequestsDrugsComponent } from './store-requests-drugs.component';

describe('StoreRequestsDrugsComponent', () => {
  let component: StoreRequestsDrugsComponent;
  let fixture: ComponentFixture<StoreRequestsDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreRequestsDrugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRequestsDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
