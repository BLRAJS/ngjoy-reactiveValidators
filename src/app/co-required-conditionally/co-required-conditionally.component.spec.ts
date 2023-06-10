import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoRequiredConditionallyComponent } from './co-required-conditionally.component';

describe('CoRequiredConditionallyComponent', () => {
  let component: CoRequiredConditionallyComponent;
  let fixture: ComponentFixture<CoRequiredConditionallyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoRequiredConditionallyComponent]
    });
    fixture = TestBed.createComponent(CoRequiredConditionallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
