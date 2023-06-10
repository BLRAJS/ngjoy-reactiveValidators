import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgJoyValidatorsService,NumericValueType} from "ngJoyValidators";
import {ReactiveErrorsService} from "../reactive-errors.service";

@Component({
  selector: 'app-custom-validator-second-part',
  templateUrl: './custom-validator-second-part.component.html',
  styleUrls: ['./custom-validator-second-part.component.scss']
})
export class CustomValidatorSecondPartComponent {
  userForm!: FormGroup;

  constructor(private validationService: NgJoyValidatorsService,
              public reactiveErrorsService: ReactiveErrorsService,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', [
        this.validationService.asciiValidator('Name can only contain ASCII characters.'),
      ]],
      lastName: ['', [
        this.validationService.noWhitespace('Name can not contain whitespaces.')
      ]],
      personalDigitNumber: ['', [
        this.validationService.digitValidator('Personal Digit Number can only contain digits.')
      ]],
      email: ['', [
        Validators.email,
        this.validationService.emailDomain(['example.com'], 'Email domain must be example.com.')
      ]],
      website: ['', [
        this.validationService.url({message: 'Website must be a valid URL.'})
      ]],
      scriptExample: ['', [
        this.validationService.scriptLanguageType('Latin', 'Input must only contain Latin script characters.')
      ]],
      sanitizedInput: ['', [
        this.validationService.sanitizeInput('Input must not contain scripting.')
      ]],
      jsonField: ['', this.validationService.json("Invalid JSON format")],
      latitudeField: ['', this.validationService.latitude("Invalid latitude value")],
      leapYearField: ['', this.validationService.leapYear("Not a leap year")],
      latLongField: ['', this.validationService.latLong("Invalid latitude or longitude value")],
      longitudeField: ['', this.validationService.longitude("Invalid longitude value")],
      lowerCaseField: ['', this.validationService.lowerCase("Only lowercase letters are allowed")],
      upperCaseField: ['', this.validationService.upperCase({message:"Value must be in uppercase"})],
      macField: ['', this.validationService.mac("Invalid MAC address")],
      maxDateField: ['', this.validationService.maxDate({
        value: "02-06-2023",
        format: "DD-MM-YYYY",
        message: "Date must be less than or equal to the maximum date."
      })],
      maxNumberField: ['', this.validationService.maxNumber({value: 100})],
      minDateField: ['', this.validationService.minDate({
        value: "01-01-2020",
        format: "DD-MM-YYYY",
        message: "Date must be greater than or equal to the minimum date."
      })],
      minNumberField: ['', this.validationService.minNumber({value: 10})],
      numericField: ['', this.validationService.numeric({
        acceptValue: NumericValueType.PositiveNumber,
        allowDecimal: true,
        message:"Value must be a valid numeric value only"
      })],
      oddField: ['', this.validationService.odd("Value must be an odd number only")],
      portField: ['', this.validationService.port({message: 'Invalid port number.'})],
      primeNumberField: ['', this.validationService.primeNumber({message: 'Value must be a prime number.'})],
      timeField: ['', this.validationService.time({format: '24'})],
      extensionField: ['', this.validationService.extension(['png', 'jpg', 'gif'], 'File extension not allowed.')],
      evenField: ['', this.validationService.even('Value is not an even number.')],
      factorField: ['', this.validationService.factor(100, 'Value is not a factor of 100.')],
      fileField: ['', this.validationService.file(2, 5, 'Number of files is not within the specified range.')],
      fileSizeField: ['', this.validationService.fileSize(100000, 'File size exceeds the maximum allowed size.')],
      ipField: ['', this.validationService.ip({versions: [4, 6]})],
    });
  }

  handleFileInput(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      ['fileSizeField','fileField'].forEach(fileType =>
        this.userForm.get(fileType)?.setValue(fileList, { emitModelToViewChange: false }))
    }
  }
}
