import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPeriodoGeneralDialogComponent } from './register-periodo-general-dialog.component';

describe('RegisterPeriodoGeneralComponent', () => {
  let component: RegisterPeriodoGeneralDialogComponent;
  let fixture: ComponentFixture<RegisterPeriodoGeneralDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPeriodoGeneralDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPeriodoGeneralDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
