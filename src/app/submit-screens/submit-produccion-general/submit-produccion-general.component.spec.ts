import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitProduccionGeneralComponent } from './submit-produccion-general.component';

describe('SubmitProduccionGeneralComponent', () => {
  let component: SubmitProduccionGeneralComponent;
  let fixture: ComponentFixture<SubmitProduccionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitProduccionGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitProduccionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
