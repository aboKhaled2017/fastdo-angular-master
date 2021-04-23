import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VTabsComponent } from './v-tabs.component';

describe('VTabsComponent', () => {
  let component: VTabsComponent;
  let fixture: ComponentFixture<VTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
