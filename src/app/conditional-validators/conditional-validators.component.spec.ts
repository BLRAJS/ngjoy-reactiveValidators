import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalValidatorsComponent } from './conditional-validators.component';

describe('ConditionalValidatorsComponent', () => {
  let component: ConditionalValidatorsComponent;
  let fixture: ComponentFixture<ConditionalValidatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionalValidatorsComponent]
    });
    fixture = TestBed.createComponent(ConditionalValidatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
