import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgJoyValidatorsService} from "ngJoyValidators";
import {ReactiveErrorsService} from "../reactive-errors.service";

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent {
  paymentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public reactiveErrorsService: ReactiveErrorsService,
    private ngJoyValidators: NgJoyValidatorsService
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [this.ngJoyValidators.creditCard('Please enter a valid card number.')]],
      expiryDate: ['', [this.ngJoyValidators.expiryDate('Card has expired.')]],
      cvv: ['', [this.ngJoyValidators.cvv('Invalid CVV.')]],
      iban: ["",[this.ngJoyValidators.ibanValidator()]],
      currencyCode: ["",[this.ngJoyValidators.currencyCodeValidator("Is not a valid ISO 4217 currency code")]]
    });
  }

  submitForm() {
    if (this.paymentForm.valid) {
      console.log('Form Submitted!', this.paymentForm.value);
    }
  }
}
