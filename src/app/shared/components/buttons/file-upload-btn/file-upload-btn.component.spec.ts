import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadBtnComponent } from './file-upload-btn.component';

describe('FileUploadBtnComponent', () => {
  let component: FileUploadBtnComponent;
  let fixture: ComponentFixture<FileUploadBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
