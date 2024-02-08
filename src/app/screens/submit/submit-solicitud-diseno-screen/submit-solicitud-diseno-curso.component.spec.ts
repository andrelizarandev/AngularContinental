import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSolicitudDisenoCursoComponent } from './submit-solicitud-diseno-curso.component';

describe('SubmitSolicitudDisenoCursoComponent', () => {
  let component: SubmitSolicitudDisenoCursoComponent;
  let fixture: ComponentFixture<SubmitSolicitudDisenoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitSolicitudDisenoCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitSolicitudDisenoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
