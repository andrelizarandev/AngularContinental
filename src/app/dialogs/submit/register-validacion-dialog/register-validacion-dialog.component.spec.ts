import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterValidacionDialogComponent } from './register-validacion-dialog.component';

describe('RegisterValidacionDialogComponent', () => {
  let component: RegisterValidacionDialogComponent;
  let fixture: ComponentFixture<RegisterValidacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterValidacionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterValidacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
