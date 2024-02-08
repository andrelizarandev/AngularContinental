import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPeriodoDialogComponent } from './register-periodo-dialog.component';

describe('RegisterPeriodoDialogComponent', () => {
  let component: RegisterPeriodoDialogComponent;
  let fixture: ComponentFixture<RegisterPeriodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPeriodoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPeriodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
