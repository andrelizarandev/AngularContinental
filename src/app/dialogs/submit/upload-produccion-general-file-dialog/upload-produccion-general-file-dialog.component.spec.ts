import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProduccionGeneralFileDialogComponent } from './upload-produccion-general-file-dialog.component';

describe('UploadProduccionGeneralFileDialogComponent', () => {
  let component: UploadProduccionGeneralFileDialogComponent;
  let fixture: ComponentFixture<UploadProduccionGeneralFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadProduccionGeneralFileDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadProduccionGeneralFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
