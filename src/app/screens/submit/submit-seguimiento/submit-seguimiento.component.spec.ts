import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSeguimientoComponent } from './submit-seguimiento.component';

describe('SubmitSeguimientoComponent', () => {
  let component: SubmitSeguimientoComponent;
  let fixture: ComponentFixture<SubmitSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitSeguimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
