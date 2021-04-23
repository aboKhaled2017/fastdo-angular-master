import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDrugsRequestsComponent } from './my-drugs-requests.component';

describe('MyDrugsRequestsComponent', () => {
  let component: MyDrugsRequestsComponent;
  let fixture: ComponentFixture<MyDrugsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDrugsRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDrugsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
