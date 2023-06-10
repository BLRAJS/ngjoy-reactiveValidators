import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomValidatorSecondPartComponent } from './custom-validator-second-part.component';

describe('CustomValidatorSeconPartComponent', () => {
  let component: CustomValidatorSecondPartComponent;
  let fixture: ComponentFixture<CustomValidatorSecondPartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomValidatorSecondPartComponent]
    });
    fixture = TestBed.createComponent(CustomValidatorSecondPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
