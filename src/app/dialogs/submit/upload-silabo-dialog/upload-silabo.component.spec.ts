import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSilaboDialogComponent } from './upload-silabo.component';

describe('UploadSilaboDialogComponent', () => {
  let component: UploadSilaboDialogComponent;
  let fixture: ComponentFixture<UploadSilaboDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadSilaboDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadSilaboDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
