import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWithSkeletonComponent } from './card-with-skeleton.component';

describe('CardWithSkeletonComponent', () => {
  let component: CardWithSkeletonComponent;
  let fixture: ComponentFixture<CardWithSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWithSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardWithSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
