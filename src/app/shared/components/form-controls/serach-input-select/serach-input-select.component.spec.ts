import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachInputSelectComponent } from './serach-input-select.component';

describe('SerachInputSelectComponent', () => {
  let component: SerachInputSelectComponent;
  let fixture: ComponentFixture<SerachInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerachInputSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerachInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
