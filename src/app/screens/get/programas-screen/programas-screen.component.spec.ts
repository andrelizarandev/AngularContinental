import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasScreenComponent } from './programas-screen.component';

describe('ProgramasScreenComponent', () => {
  let component: ProgramasScreenComponent;
  let fixture: ComponentFixture<ProgramasScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramasScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
