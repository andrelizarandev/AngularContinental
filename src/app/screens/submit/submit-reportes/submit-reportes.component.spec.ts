import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitReportesComponent } from './submit-reportes.component';

describe('SubmitReportesComponent', () => {
  let component: SubmitReportesComponent;
  let fixture: ComponentFixture<SubmitReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitReportesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
