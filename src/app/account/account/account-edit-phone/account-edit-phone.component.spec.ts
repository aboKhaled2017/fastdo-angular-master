import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditPhoneComponent } from './account-edit-phone.component';

describe('AccountEditPhoneComponent', () => {
  let component: AccountEditPhoneComponent;
  let fixture: ComponentFixture<AccountEditPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountEditPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
