import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProduccionGeneralByRowComponent } from './register-produccion-general-by-row.component';

describe('RegisterProduccionGeneralByRowComponent', () => {
  let component: RegisterProduccionGeneralByRowComponent;
  let fixture: ComponentFixture<RegisterProduccionGeneralByRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProduccionGeneralByRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterProduccionGeneralByRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
