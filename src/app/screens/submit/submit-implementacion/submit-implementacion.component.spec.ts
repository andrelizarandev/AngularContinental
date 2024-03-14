import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitImplementacionComponent } from './submit-implementacion.component';

describe('SubmitImplementacionComponent', () => {
  let component: SubmitImplementacionComponent;
  let fixture: ComponentFixture<SubmitImplementacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitImplementacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitImplementacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
