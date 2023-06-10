import {Component} from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl,
  FormGroup,
  UntypedFormGroup, Validators,
} from "@angular/forms";

import {ReactiveErrorsService} from "../reactive-errors.service";
import {NgJoyValidatorsService} from "ngJoyValidators";


@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.scss']
})
export class FormTestComponent {


  profileForm!: UntypedFormGroup;

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  removeAlias(index: number) {
    this.aliases.removeAt(index);
  }

  get addressgroup(): FormGroup {
    return this.profileForm.get('address') as FormGroup;
  }

  constructor(private fb: FormBuilder,
              private validationService: NgJoyValidatorsService,
              public reactiveErrorsService: ReactiveErrorsService) {
  }

  addAlias() {
    this.aliases.push(this.fb.control('', [this.validationService.unique()]));
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
        firstName: ['', [this.validationService.endsWith("lee", "You are not originally from Asia your name must end with ...lee")]],
        lastName: ['', [this.validationService.oneOf(["Pacino", "Deniro", "Afleck"], "Your last name can be Pacino, Deniro, Afleck")]],
        age: ['', [this.validationService.range({
          minimumNumber: 18,
          maximumNumber: 65,
          message: "You are qualified to join the army if you are between 18 and 65"
        })]],
        beers: ["", [this.validationService.greaterThanEqualTo({fieldName: 'age'}, 'Field Beers should be greater than or equal to Field age')]],
        phone: ['', [this.validationService.startsWith("40", "You phone number must be Austrian ,must start with 40")]],
        password: ['', [this.validationService.password({
          validation: {
            minLength: 5,
            maxLength: 10,
            digit: true,
            specialCharacter: true
          },
          message: 'Password must have at least one digit, one special character, and be between 5 and 10 characters in length.'
        }), Validators.required]],
        repeatPass: ['', [this.validationService.compare('password'), Validators.required]],
        address: this.fb.group({
            street: ['', []],
            city: ['', []],
            state: ['', []],
            zip: [''],
            salary: [''],
            rentAmount: [],
            budget: []
          }, {validators: [this.validationService.sumOfFields(['salary', 'rentAmount', 'budget'], 5000, "Thee sum value of you salary rent and budget must be 5000")]},
        ),
        aliases: this.fb.array([
          this.fb.control('', [Validators.required])
        ], {validators: [this.validationService.minMaxArrayLength(3, 7, "Min 3 aliases", "Max 7 aliases"), this.validationService.allFieldsFilled()]})
      },
    );
  }

  submitForm(): void {
    // Handle form submission
  }
}
