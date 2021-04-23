import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsCreateComponent } from './drugs-create.component';

describe('DrugsCreateComponent', () => {
  let component: DrugsCreateComponent;
  let fixture: ComponentFixture<DrugsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
