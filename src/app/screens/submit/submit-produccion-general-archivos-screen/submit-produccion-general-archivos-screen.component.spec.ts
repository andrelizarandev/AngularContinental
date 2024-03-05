import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitProduccionGeneralArchivosScreenComponent } from './submit-produccion-general-archivos-screen.component';

describe('SubmitProduccionGeneralArchivosScreenComponent', () => {
  let component: SubmitProduccionGeneralArchivosScreenComponent;
  let fixture: ComponentFixture<SubmitProduccionGeneralArchivosScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitProduccionGeneralArchivosScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitProduccionGeneralArchivosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
