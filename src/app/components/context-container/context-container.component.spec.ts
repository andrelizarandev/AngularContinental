import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextContainerComponent } from './context-container.component';

describe('ContextContainerComponent', () => {
  let component: ContextContainerComponent;
  let fixture: ComponentFixture<ContextContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
