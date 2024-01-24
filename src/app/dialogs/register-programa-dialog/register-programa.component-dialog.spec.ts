import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProgramaComponentDialog } from './register-programa.component-dialog';

describe('RegisterProgramaComponent', () => {
  let component: RegisterProgramaComponentDialog;
  let fixture: ComponentFixture<RegisterProgramaComponentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProgramaComponentDialog]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterProgramaComponentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
