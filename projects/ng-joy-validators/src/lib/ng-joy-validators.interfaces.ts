import {AbstractControl, FormControl} from "@angular/forms";

export interface BooleanFn {
  (): boolean;
}

export interface FieldNameConfig {
  fieldName: string | (readonly (string | number)[]);
}

export interface ConditionalDisabledOptions {
  dependentFieldName: string;
  conditionalExpression: (control: AbstractControl) => boolean;
}

export function defaultConditionalCheck<T>(value: T, formControl: FormControl): boolean {
  return Boolean(value);
}


export interface TimeValidationOptions {
  format?: '24' | '12';
  message?: string;
}

export interface RangeValidationOptions {
  minimumNumber?: number;
  maximumNumber?: number;
  message?: string;
}

export enum NumericValueType {
  PositiveNumber = 'positive',
  NegativeNumber = 'negative',
  DecimalNumber = 'decimal'
}

export interface CustomErrorMessage {
  message?: string;
}

export interface PasswordValidationOptions {
  minLength?: number;
  maxLength?: number;
  digit?: boolean;
  specialCharacter?: boolean;
}

export interface NumericOptions {
  acceptValue: NumericValueType;
  allowDecimal?: boolean;
  message?: string;
}

export interface CardRegExps {
  [cardType: string]: RegExp;
}

export interface ImageValidationConfig {
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
}

export interface IBANValidationResult {
  ibanInvalid: boolean;
  error: IBANError;
}

export interface IBANError {
  countryUnsupported: boolean;
  codeLengthInvalid: boolean;
  patternInvalid: boolean;
}
