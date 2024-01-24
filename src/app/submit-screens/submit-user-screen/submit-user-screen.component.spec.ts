import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitUserScreenComponent } from './submit-user-screen.component';

describe('SubmitUserScreenComponent', () => {
  let component: SubmitUserScreenComponent;
  let fixture: ComponentFixture<SubmitUserScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitUserScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitUserScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
