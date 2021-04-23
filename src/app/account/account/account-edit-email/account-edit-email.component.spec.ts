import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditEmailComponent } from './account-edit-email.component';

describe('AccountEditEmailComponent', () => {
  let component: AccountEditEmailComponent;
  let fixture: ComponentFixture<AccountEditEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountEditEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
