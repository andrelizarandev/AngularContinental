import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesDisenoCursoComponent } from './solicitudes-diseno-curso.component';

describe('SolicitudesDisenoCursoComponent', () => {
  let component: SolicitudesDisenoCursoComponent;
  let fixture: ComponentFixture<SolicitudesDisenoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesDisenoCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudesDisenoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
