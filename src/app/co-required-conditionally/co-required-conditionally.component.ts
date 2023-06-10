import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReactiveErrorsService} from "../reactive-errors.service";
import {NgJoyValidatorsService} from "ngJoyValidators";


@Component({
  selector: 'app-co-required-conditionally',
  templateUrl: './co-required-conditionally.component.html',
  styleUrls: ['./co-required-conditionally.component.scss']
})
export class CoRequiredConditionallyComponent {
  demoForm!: FormGroup;
  companyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationService:NgJoyValidatorsService,
    public reactiveErrorsService:ReactiveErrorsService
  ) { }

  ngOnInit(): void {

    this.demoForm = this.fb.group({
      email: ['',[this.validationService.coRequiredValidator('email', 'phone', 'Either field1 or field2 is required.')
      ]],
      phone: ['',[this.validationService.coRequiredValidator('email', 'phone', 'Either field1 or field2 is required.')
      ]],
    });


    this.companyForm = this.fb.group({
      businessType: [''],
      companyName: ['', [Validators.required,this.validationService.conditionalDisableValidator({
        dependentFieldName: 'businessType',
        conditionalExpression: (dependentField: AbstractControl) => {
          return dependentField.value === 'Self Employed';
        }
      })]
      ],
      companySize: ['',[Validators.required,this.validationService.conditionalDisableValidator({
        dependentFieldName: 'businessType',
        conditionalExpression: (dependentField: AbstractControl) => {
          return dependentField.value === 'Self Employed';
        }
      })]],
      companyLocation: [''],
      companyIndustry: ['']
    });

  }
}
