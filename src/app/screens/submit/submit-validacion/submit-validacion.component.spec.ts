import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitValidacionComponent } from './submit-validacion.component';

describe('SubmitValidacionComponent', () => {
  let component: SubmitValidacionComponent;
  let fixture: ComponentFixture<SubmitValidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitValidacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
