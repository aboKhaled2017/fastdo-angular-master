import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsReqsListWeRecievedComponent } from './drugs-reqs-list-we-recieved.component';

describe('DrugsReqsListWeRecievedComponent', () => {
  let component: DrugsReqsListWeRecievedComponent;
  let fixture: ComponentFixture<DrugsReqsListWeRecievedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsReqsListWeRecievedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsReqsListWeRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
