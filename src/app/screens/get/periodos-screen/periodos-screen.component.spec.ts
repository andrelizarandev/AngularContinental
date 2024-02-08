import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosScreenComponent } from './periodos-screen.component';

describe('PeriodosScreenComponent', () => {
  let component: PeriodosScreenComponent;
  let fixture: ComponentFixture<PeriodosScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodosScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeriodosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
