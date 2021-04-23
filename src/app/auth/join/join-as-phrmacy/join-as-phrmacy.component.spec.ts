import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinAsPhrmacyComponent } from './join-as-phrmacy.component';

describe('JoinAsPhrmacyComponent', () => {
  let component: JoinAsPhrmacyComponent;
  let fixture: ComponentFixture<JoinAsPhrmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinAsPhrmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinAsPhrmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
