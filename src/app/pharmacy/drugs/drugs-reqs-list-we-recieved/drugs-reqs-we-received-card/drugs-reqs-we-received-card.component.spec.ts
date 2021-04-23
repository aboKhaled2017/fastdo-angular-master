import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsReqsWeReceivedCardComponent } from './drugs-reqs-we-received-card.component';

describe('DrugsReqsWeReceivedCardComponent', () => {
  let component: DrugsReqsWeReceivedCardComponent;
  let fixture: ComponentFixture<DrugsReqsWeReceivedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsReqsWeReceivedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsReqsWeReceivedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
