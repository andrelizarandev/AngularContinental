import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRolDialogComponent } from './register-rol-dialog.component';

describe('RegisterRolDialogComponent', () => {
  let component: RegisterRolDialogComponent;
  let fixture: ComponentFixture<RegisterRolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterRolDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterRolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
