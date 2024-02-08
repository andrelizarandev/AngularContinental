import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCarpetaComponent } from './submit-carpeta.component';

describe('SubmitCarpetaComponent', () => {
  let component: SubmitCarpetaComponent;
  let fixture: ComponentFixture<SubmitCarpetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitCarpetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitCarpetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
