import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConfirmEditEmailComponent } from './account-confirm-edit-email.component';

describe('AccountConfirmEditEmailComponent', () => {
  let component: AccountConfirmEditEmailComponent;
  let fixture: ComponentFixture<AccountConfirmEditEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountConfirmEditEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountConfirmEditEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
