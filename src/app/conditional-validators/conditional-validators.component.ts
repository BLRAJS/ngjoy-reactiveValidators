import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReactiveErrorsService} from "../reactive-errors.service";
import {NgJoyValidatorsService} from "ngJoyValidators";

@Component({
  selector: 'app-conditional-validators',
  templateUrl: './conditional-validators.component.html',
  styleUrls: ['./conditional-validators.component.scss']
})
export class ConditionalValidatorsComponent {
  demoForm!: FormGroup;
  countries: Array<{ code: string; name: string }> = [
    {code: 'US', name: 'United States'},
    {code: 'UK', name: 'United Kingdom'},
    {code: 'FR', name: 'France'},
    {code: 'DE', name: 'Germany'},
    {code: 'CA', name: 'Canada'},
    {code: 'NK', name: 'North Korea'},

  ];

  constructor(
    private validationService:NgJoyValidatorsService,
    private fb: FormBuilder,
    public reactiveErrorsService: ReactiveErrorsService
  ) {
  }

  ngOnInit(): void {
    this.demoForm = this.fb.group({
      firstName: [''],
      lastName: ['', []],
      country: [''],
      age: ['', [Validators.required]],
      phone: ['', [ this.validationService.conditionalValidators<string>(
        'country',
        [Validators.required,
          this.validationService.oneOf(["0032", "0039"], "It can be either  0039 or 0032"),
        ],
        (value: any) => value === "NK",
      )]],
      email: ['', [this.validationService.conditionalValidators<string>(
        'firstName',
        [Validators.required,
          this.validationService.endsWith('gmail.com', "Only gmail.com please"),
        ],
        (value: any,formControl:FormControl) => value === "James" || formControl.value.includes("test"),
      )]],
      beerAmount: ['', [this.validationService.conditionalValidators<number>(
        'age',
        [Validators.required, Validators.max(6),Validators.min(0)],
        (value: number) => value < 18,
      )]],
    }, {});

  }
}
