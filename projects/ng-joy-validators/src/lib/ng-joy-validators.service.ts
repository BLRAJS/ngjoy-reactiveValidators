import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn,} from "@angular/forms";
import {TimeValidationOptions, NumericOptions, PasswordValidationOptions, CustomErrorMessage,
  NumericValueType,defaultConditionalCheck, RangeValidationOptions, CardRegExps, ConditionalDisabledOptions, FieldNameConfig
} from "./ng-joy-validators.interfaces";
import {EMPTY, Subscription} from "rxjs";
import {isoCurrencyCodes, ibanCountries} from "./ng-joy-data";


@Injectable({
  providedIn: 'root'
})
export class NgJoyValidatorsService {

  currencyCodeValidator(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && typeof value === 'string' && !isoCurrencyCodes.includes(value.toUpperCase())) {
        return {'currencyCode': errorMessage || true};
      }
      return null;
    };
  }

  oneOf(allowedValues: (string | number)[], errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!allowedValues.includes(value)) {
        return {oneOf: errorMessage || true};
      }

      return null;
    };
  }

  noneOf(disallowedValues: (string | number)[], errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (disallowedValues.includes(value)) {
        return {noneOf: errorMessage || true};
      }

      return null;
    };
  }

  extension(allowedExtensions: string[], errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && allowedExtensions.length > 0) {
        const fileExtension = value.split('.').pop()?.toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          return {extension: errorMessage || true};
        }
      }

      return null;
    };
  }

  endsWith(suffix: string, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && !value.endsWith(suffix)) {
        return {endsWith: errorMessage || true};
      }

      return null;
    };
  }


  even(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && typeof value === 'number' && value % 2 !== 0) {
        return {even: errorMessage || true};
      }

      return null;
    };
  }

  factor(dividend: number, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && typeof value === 'number' && dividend % value !== 0) {
        return {factor: errorMessage || true};
      }

      return null;
    };
  }

  file(minFiles: number, maxFiles: number, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: FileList | null = control.value;

      if (files && files.length > 0) {
        console.log(files.length, minFiles)
        if (files.length < minFiles || files.length > maxFiles) {
          return {file: errorMessage || true};
        }
      }

      return null;
    };
  }

  fileSize(maxSizeInBytes: number, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: FileList = control.value;

      if (files instanceof FileList && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files.item(i);
          if (file && file.size > maxSizeInBytes) {
            return {fileSize: errorMessage || true};
          }
        }
      }

      return null;
    };
  }

  ip(config: { versions: number[], errorMessage?: string }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const versions = config.versions;
      const errorMessage = config.errorMessage || 'Invalid IP address.';

      if (value && typeof value === 'string') {
        for (const version of versions) {
          if (version === 4 && this.validateIPv4(value)) {
            return null;
          }
          if (version === 6 && this.validateIPv6(value)) {
            return null;
          }
        }
        return {ip: errorMessage};
      }

      return null;
    };
  }

  validateIPv4(value: string): boolean {
    const ipv4Pattern = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Pattern.test(value);
  }

  validateIPv6(value: string): boolean {
    const ipv6Pattern = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/;
    return ipv6Pattern.test(value);
  }

  json(errorMessage: string = 'Invalid JSON format'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      try {
        JSON.parse(value);
      } catch (error) {
        return {json: errorMessage};
      }

      return null;
    };
  }

  latitude(errorMessage: string = 'Invalid latitude value'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && (isNaN(value) || value < -90 || value > 90)) {
        return {latitude: errorMessage};
      }

      return null;
    };
  }

  leapYear(errorMessage: string = 'Not a leap year'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && (isNaN(value) || !this.isLeapYear(value))) {
        return {leapYear: errorMessage};
      }

      return null;
    };
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }


  latLong(errorMessage: string = 'Invalid latitude or longitude value'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && (isNaN(value) || value < -90 || value > 90) && (value < -180 || value > 180)) {
        return {latLong: errorMessage};
      }

      return null;
    };
  }

  longitude(errorMessage: string = 'Invalid longitude value'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && (isNaN(value) || value < -180 || value > 180)) {
        return {longitude: errorMessage};
      }

      return null;
    };
  }

  lowerCase(errorMessage: string = 'Only lowercase letters are allowed'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && !/^[a-z]+$/.test(value)) {
        return {lowerCase: errorMessage};
      }

      return null;
    };
  }

  mac(errorMessage: string = 'Invalid MAC address'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && !/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value)) {
        return {mac: errorMessage};
      }

      return null;
    };
  }


  maxDate(config: { value: string, format: string, message?: string }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Parse the date based on the specified format
      const dateParts = config.value.split('-');
      let maxDate: Date;
      if (config.format === 'DD-MM-YYYY') {
        maxDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
      } else if (config.format === 'MM-DD-YYYY') {
        maxDate = new Date(Number(dateParts[2]), Number(dateParts[0]) - 1, Number(dateParts[1]));
      } else {
        maxDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
      }

      const message = config.message || 'Date must be less than or equal to the maximum date.';

      if (value && new Date(value).getTime() > maxDate.getTime()) {
        return {maxDate: message};
      }

      return null;
    };
  }


  maxNumber(config: { value: number, message?: string }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const maxNumber = config.value;
      const message = config.message || `Value must be less than or equal to ${maxNumber}.`;

      if (value !== null && value > maxNumber) {
        return {maxNumber: message};
      }

      return null;
    };
  }

  minDate(config: { value: string, format: string, message?: string }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Parse the date based on the specified format
      const dateParts = config.value.split('-');
      let minDate: Date;
      if (config.format === 'DD-MM-YYYY') {
        minDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
      } else if (config.format === 'MM-DD-YYYY') {
        minDate = new Date(Number(dateParts[2]), Number(dateParts[0]) - 1, Number(dateParts[1]));
      } else {
        minDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
      }

      const message = config.message || 'Date must be greater than or equal to the minimum date.';

      if (value && new Date(value).getTime() < minDate.getTime()) {
        return {minDate: message};
      }

      return null;
    };
  }

  minNumber(config: { value: number, message?: string }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const minNumber = config.value;
      const message = config.message || `Value must be greater than or equal to ${minNumber}.`;

      if (value !== null && value < minNumber) {
        return {minNumber: message};
      }

      return null;
    };
  }

  numeric(options: NumericOptions): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const acceptValue = options.acceptValue;
      const allowDecimal = options.allowDecimal || false;
      const message = options.message || 'Value must be a valid numeric value.';

      if (typeof value !== 'number' && typeof value !== 'string') {
        return {numeric: message};
      }

      const numericRegex = allowDecimal
        ? /^[-+]?[0-9]+(\.[0-9]+)?$/
        : /^[-+]?[0-9]+$/;

      if (!numericRegex.test(value.toString())) {
        return {numeric: message};
      }

      if (acceptValue === NumericValueType.PositiveNumber && parseFloat(value.toString()) <= 0) {
        return {numeric: message};
      }

      if (acceptValue === NumericValueType.NegativeNumber && parseFloat(value.toString()) >= 0) {
        return {numeric: message};
      }

      return null;
    };
  }

  odd(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isOdd = !isNaN(value) && parseInt(value, 10) % 2 !== 0;

      if (!isOdd) {
        return {odd: message ? message : 'Value must be an odd number.'};
      }

      return null;
    };
  }


  password(options: { validation: PasswordValidationOptions, message?: string }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const validation = options.validation;

      const minLength = validation.minLength || 0;
      const maxLength = validation.maxLength || Infinity;
      const digit = validation.digit || false;
      const specialCharacter = validation.specialCharacter || false;

      if (value.length < minLength) {
        return {password: {valid: false, message: `Password must be at least ${minLength} characters long.`}};
      }

      if (value.length > maxLength) {
        return {password: {valid: false, message: `Password must not exceed ${maxLength} characters.`}};
      }

      if (digit && !/\d/.test(value)) {
        return {password: {valid: false, message: `Password must contain at least one digit.`}};
      }

      if (specialCharacter && !/[!@#$%^&*]/.test(value)) {
        return {password: {valid: false, message: `Password must contain at least one special character (!@#$%^&*).`}};
      }

      return null;
    };
  }


  port(options: CustomErrorMessage = {}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const message = options.message || 'Invalid port number.';

      if (!value || !/^\d+$/.test(value)) {
        return {port: message};
      }

      const portNumber = parseInt(value, 10);

      if (portNumber < 0 || portNumber > 65535) {
        return {port: message};
      }

      return null;
    };
  }


  primeNumber(options: CustomErrorMessage = {}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const message = options.message || 'Value must be a prime number.';

      if (!value || isNaN(value) || value < 2) {
        return {primeNumber: message};
      }

      const number = parseInt(value, 10);
      const isPrime = this.isNumberPrime(number);

      if (!isPrime) {
        return {primeNumber: message};
      }

      return null;
    };
  }

  isNumberPrime(number: number): boolean {
    if (number === 2) {
      return true;
    }

    if (number < 2 || number % 2 === 0) {
      return false;
    }

    const sqrt = Math.sqrt(number);

    for (let i = 3; i <= sqrt; i += 2) {
      if (number % i === 0) {
        return false;
      }
    }

    return true;
  }


  range(options: RangeValidationOptions = {}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const minimumNumber = options.minimumNumber;
      const maximumNumber = options.maximumNumber;
      const message = options.message || 'Value must be within the specified range.';

      if (minimumNumber !== undefined && value < minimumNumber) {
        return {range: message};
      }

      if (maximumNumber !== undefined && value > maximumNumber) {
        return {range: message};
      }

      return null;
    };
  }

  startsWith(value: string, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = control.value;
      const startsWithValue = value;
      const errorMessage = message || `Value must start with '${startsWithValue}'.`;

      if (!controlValue || !controlValue.startsWith(startsWithValue)) {
        return {startsWith: errorMessage};
      }

      return null;
    };
  }


  time(options: TimeValidationOptions = {}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const format = options.format || '24';
      const message = options.message || 'Invalid time format.';

      const regex = format === '12' ? /^([0]?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i : /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

      if (!value || !regex.test(value)) {
        return {time: message};
      }

      return null;
    };
  }

  unique(message: string = 'The value must be unique'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const formArray = control.parent as FormArray;

      if (!formArray || !Array.isArray(formArray.controls)) {
        return null; // Return null if the form array or controls are not available
      }

      const duplicateValues = formArray.controls
        .filter((controlItem) => controlItem !== control)
        .map((controlItem) => controlItem.value)
        .filter((itemValue) => itemValue === value);

      if (duplicateValues.length > 0) {
        return {unique: {valid: false, message}}; // Return an error object if duplicate values are found
      }

      return null; // Return null if the value is unique
    };
  }


  minMaxArrayLength(min: number = -Infinity, max: number = Infinity, minMessage: string = '', maxMessage: string = ''): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) {
        return null;
      }

      const length = control.controls.length;

      if (length < min) {
        return {arrayLength: minMessage};
      }

      if (length > max) {
        return {arrayLength: maxMessage};
      }

      return null;
    };
  }


  allFieldsFilled(message: string = 'All fields must be filled.'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) {
        return null;
      }

      for (let i = 0; i < control.controls.length; i++) {
        if (!control.controls[i].valid) {
          return {allFieldsFilled: {valid: false, message}};
        }
      }

      return null;
    };
  }


  sumOfFields(fields: string[], sumValue: number, errorMessage: string = 'Sum of fields does not match the expected value'): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const fieldValues = fields.map(fieldName => {
        const control = group.get(fieldName);
        return control && control.value ? parseFloat(control.value) : 0;
      });

      const totalSum = fieldValues.reduce((acc, curr) => acc + curr, 0);

      if (totalSum !== sumValue) {
        return {sumMismatch: {valid: false, message: errorMessage}};
      }

      return null;
    };
  }


  upperCase(options: CustomErrorMessage = {}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const message = options.message || 'Value must be in uppercase.';

      if (value && value !== value.toUpperCase()) {
        return {upperCase: message};
      }

      return null;
    };
  }

  url(options: CustomErrorMessage = {}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const message = options.message || 'Invalid URL format.';

      // Regular expression for URL validation
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

      if (value && !urlRegex.test(value)) {
        return {url: message};
      }

      return null;
    };
  }

  compare(fieldName: string, message: string = 'Values do not match.'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const otherControl = control.root.get(fieldName);

      if (otherControl && value !== otherControl.value) {
        return {compare: message};
      }

      return null;
    };
  }

  creditCard(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value.toString();

      // Check if it only contains digits
      if (!/^\d+$/.test(value)) {
        return {creditCard: errorMessage || 'Invalid credit card number.'};
      }

      // Card type detection
      let cardType = this.detectCardType(value);
      if (!cardType) {
        return {creditCard: errorMessage || 'Invalid credit card number.'};
      }

      // Luhn's algorithm
      let sum = 0;
      let shouldDouble = false;
      for (let i = value.length - 1; i >= 0; i--) {
        let digit = +value[i];

        if (shouldDouble) {
          if ((digit *= 2) > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
      }

      if (sum % 10 !== 0) {
        return {creditCard: errorMessage || 'Invalid credit card number.'};
      }

      return null;
    };
  }

  detectCardType(number: string): string | null {
    const cardTypes: CardRegExps = {
      'amex': /^3[47][0-9]{13}$/,
      'china_union': /^62[0-5]\d{13,16}$/,
      'dankort': /^5019\d{12}$/,
      'diners': /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      'discover': /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      'elo': /^((636368)|(438935)|(504175)|(451416)|(636297)|(506699))[0-9]{10,12}$/,
      'hipercard': /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
      'jcb': /^(?:2131|1800|35\d{3})\d{11}$/,
      'maestro': /^(50[0-5]\d{4}|506[6-8]\d{3}|506[0-9]{2}|506[0-9]|506|64[0-9]{3}|65\d{2}|65[0-9]|65)[0-9]{6,13}$/,
      'mastercard': /^5[1-5][0-9]{14}$/,
      'visa': /^4[0-9]{12}(?:[0-9]{3})?$/,
      'mir': /^220[0-4]\d{12}$/,
      'nspk': /^220[5-9]\d{12}$/,
      'troy': /^9792\d{12}$/,
      'visa_electron': /^(4026|417500|4508|4844|491(3|7))\d{10}$/,
      'rupay': /^(508[5-9]|60[7-9][0-9]|61[0-9][0-9]|62[0-9][0-9]|63[0-7][0-9]|638[0-9]|6390)[0-9]{12,15}$/,
      'interpayment': /^636$/,
      'instapayment': /^637[0-9]{0,2}$/,
      'aura': /^5078[0-9]{0,2}$/,
      'cardguard': /^5392[0-9]{0,2}$/
    };

    for (const type in cardTypes) {
      if (cardTypes[type].test(number)) {
        return type;
      }
    }

    return null;
  }

  expiryDate(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const [expiryMonth, expiryYear] = value.split('/').map(Number);

      if (!expiryMonth || !expiryYear) {
        return {'expiryDate': errorMessage || 'Invalid date format.'};
      }

      const now = new Date();
      const expiryDate = new Date(expiryYear, expiryMonth, 0); // "0" day argument will get the last day of the previous month

      if (expiryDate < now) {
        return {'expiryDate': errorMessage || 'The card has expired.'};
      }

      return null;
    };
  }

  cvv(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!/^\d{3,4}$/.test(value)) {
        return {'cvv': errorMessage || 'Invalid CVV.'};
      }

      return null;
    };
  }


  ibanValidator(errorMessage: { ibanInvalid?: string, countryUnsupported?: string, codeLengthInvalid?: string, patternInvalid?: string } =
                  {
                    ibanInvalid: 'Invalid IBAN',
                    countryUnsupported: 'Country not supported',
                    codeLengthInvalid: 'Invalid code length for this country',
                    patternInvalid: 'Pattern is invalid'
                  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const countryCode = value.slice(0, 2);
      const ibanLength = ibanCountries[countryCode];

      let errors = {
        ibanInvalid: false,
        error: {countryUnsupported: '', codeLengthInvalid: '', patternInvalid: ''}
      };

      // Check country support
      if (!ibanLength) {
        errors.ibanInvalid = true;
        errors.error.countryUnsupported = errorMessage.countryUnsupported as string;
        return errors;
      }

      // Check length
      if (value.length !== ibanLength) {
        errors.ibanInvalid = true;
        errors.error.codeLengthInvalid = errorMessage.codeLengthInvalid as string;
        return errors;
      }

      // Move first four characters to the end and convert letters to numbers
      const rearrangedValue = value.slice(4) + value.slice(0, 4);
      const numberValue = rearrangedValue.split('').map((char: string) => {
        const code = char.charCodeAt(0);
        return (code > 57) ? code - 55 : char;  // For 'A' to 'Z', 'A' is converted to 10, 'B' to 11, etc.
      }).join('');

      // Perform mod-97 operation
      let remainder = '0';
      for (let i = 0; i < numberValue.length; i += 7) {  // Process in chunks to avoid overflow
        remainder = (BigInt('' + remainder + numberValue.slice(i, i + 7)) % BigInt(97)).toString();
      }

      // Check pattern
      if (remainder !== '1') {
        errors.ibanInvalid = true;
        errors.error.patternInvalid = errorMessage.patternInvalid as string;
        return errors;
      }

      return null;
    };
  }


  // ASCII Validator
  asciiValidator(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Regex to match ASCII characters
      const asciiRegex = /^[\x00-\x7F]*$/;

      if (!asciiRegex.test(value)) {
        return {'asciiInvalid': errorMessage || 'The value contains non-ASCII characters.'};
      }

      return null;
    };
  }

  // Digit Validator
  digitValidator(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Regex to match digits only
      const digitRegex = /^\d*$/;

      if (!digitRegex.test(value)) {
        return {'digitInvalid': errorMessage || 'The value contains non-digit characters.'};
      }

      return null;
    };
  }


  scriptLanguageType(script: string, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      let scriptRanges: { [key: string]: RegExp } = {
        'Latin': /^[\u0020-\u007E\u00A0-\u024F\u1E00-\u1EFF]+$/,
        'Cyrillic': /^[\u0400-\u04FF]+$/,
        'Armenian': /^[\u0530-\u058F]+$/,
        'Greek': /^[\u0370-\u03FF]+$/,
        'Arabic': /^[\u0600-\u06FF]+$/,
        'Hebrew': /^[\u0590-\u05FF]+$/,
        'Devanagari': /^[\u0900-\u097F]+$/,
        'Bengali': /^[\u0980-\u09FF]+$/,
        'Thai': /^[\u0E00-\u0E7F]+$/,
        'Chinese': /^[\u4E00-\u9FFF]+$/,
        'JapaneseHiragana': /^[\u3040-\u309F]+$/,
        'JapaneseKatakana': /^[\u30A0-\u30FF]+$/,
        'Korean': /^[\uAC00-\uD7A3]+$/
      };

      if (!scriptRanges[script].test(value)) {
        return {scriptType: errorMessage || 'Invalid script type.'};
      }

      return null;
    };
  }

  sanitizeInput(errorMessage?: string): ValidatorFn {
    const patterns: RegExp[] = [
      /<.*?script.*?>.*?<\/.*?script.*?>/gi,
      /<img[^>]+src[^>]*>/gi,
      /<img[^>]+onerror[^>]*>/gi,
      /<img[^>]+onload[^>]*>/gi,
      /href=['"]?javascript:/gi,
      /on[a-z]*=['"][^'"]*['"]/gi,
      /&#?\w+;/gi,
      /%[a-f0-9]{2}/gi,
      /data:;base64,/gi
    ];

    return (control: AbstractControl): ValidationErrors | null => {
      if (patterns.some(pattern => pattern.test(control.value))) {
        return {'noScript': errorMessage || 'Invalid input.'};
      }
      return null;
    };
  }

  noWhitespace(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (/\s/.test(value)) {
        return {'noWhitespace': errorMessage || 'Value contains whitespace.'};
      }

      return null;
    };
  }

  emailDomain(validDomains: string[], errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value || !value.includes('@')) {
        return {'emailDomain': errorMessage || 'Invalid email format.'};
      }

      const domain = value.split('@')[1];
      if (!validDomains.includes(domain)) {
        return {'emailDomain': errorMessage || 'Invalid email domain.'};
      }

      return null;
    };
  }


  conditionalDisableValidator(options: ConditionalDisabledOptions): ValidatorFn {
    let dependentField: AbstractControl;
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.parent) {
        return null;
      }

      if (!dependentField) {
        dependentField = control.parent && control.parent.get(options.dependentFieldName) as FormControl;

        if (!dependentField) {
          return null;
        }

        dependentField.valueChanges.subscribe(() => {
          if (options.conditionalExpression(dependentField)) {
            if (!control.disabled) {
              control.disable({emitEvent: false});
            }
          } else {
            if (control.disabled) {
              control.enable({emitEvent: false});
            }
          }
        });

        // Initial disabling/enabling based on the condition
        if (options.conditionalExpression(dependentField) && !control.disabled) {
          control.disable({emitEvent: false});
        } else if (!options.conditionalExpression(dependentField) && control.disabled) {
          control.enable({emitEvent: false});
        }
      }

      return null;
    };
  }

  conditionalValidators<T>(
    conditionalFieldName: string | undefined,
    validators: ValidatorFn | ValidatorFn[],
    conditionalCheck?: (value: T, formControl?: FormControl | any) => boolean
  ): ValidatorFn {
    return (formControl: AbstractControl) => {
      let errors: ValidationErrors | null = null;
      let subscription: Subscription = EMPTY.subscribe();

      if (conditionalFieldName) {
        const formGroup = formControl.parent as FormGroup;

        if (!formGroup) {
          return null;
        }

        const conditionalField = formGroup.get(conditionalFieldName) as FormControl;

        if (!conditionalField) {
          return null;
        }

        // Unsubscribe from any previous subscription to avoid memory leaks.
        if (subscription) {
          subscription.unsubscribe();
        }

        // Subscribe to the value changes of the conditional field.
        subscription = conditionalField.valueChanges.subscribe(() => {
          formControl.updateValueAndValidity();
        });

        const conditionalCheckFn = conditionalCheck || defaultConditionalCheck;
        const value = conditionalField.value as T;

        if (conditionalCheckFn(value, formControl as FormControl)) {
          const validatorArr = Array.isArray(validators) ? validators : [validators];

          errors = validatorArr.reduce((result: ValidationErrors | null, validator: ValidatorFn) => {
            const validationError = validator(formControl);
            if (validationError) {
              result = {
                ...result,
                ...validationError
              };
            }
            return result;
          }, null);
        }
      }

      if (errors) {
        const customErrors: ValidationErrors = {};
        for (const errorKey of Object.keys(errors)) {
          customErrors[errorKey] = errors[errorKey];
        }
        return customErrors;
      }

      return errors;
    };
  }

  coRequiredValidator(
    dependentFieldName1: string,
    dependentFieldName2: string,
    errorMessage: string = 'Both fields are initially required.'
  ): ValidatorFn {
    let dependentField1: AbstractControl;
    let dependentField2: AbstractControl;

    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.parent) {
        return null;
      }

      if (!dependentField1 || !dependentField2) {
        dependentField1 = control.parent && control.parent.get(dependentFieldName1) as FormControl;
        dependentField2 = control.parent && control.parent.get(dependentFieldName2) as FormControl;

        if (!dependentField1 || !dependentField2) {
          return null;
        }

        dependentField1.valueChanges.subscribe(() => control.updateValueAndValidity({emitEvent: false}));
        dependentField2.valueChanges.subscribe(() => control.updateValueAndValidity({emitEvent: false}));
      }

      if (!dependentField1.value && !dependentField2.value) {
        return {'required': errorMessage};
      }

      return null;
    };
  }


  conditionalRequiredValidator(
    dependentFieldName: string,
    conditionalExpression: (control: AbstractControl) => boolean,
    errorMessage: string = 'This field is required.'
  ): ValidatorFn {
    let dependentField: AbstractControl;

    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.parent) {
        return null;
      }

      if (!dependentField) {
        dependentField = control.parent && control?.parent?.get(dependentFieldName) as FormControl;
        if (!dependentField) {
          return null;
        }

        dependentField.valueChanges.subscribe(() => {
          control.updateValueAndValidity({emitEvent: false});
        });
      }

      if (conditionalExpression(dependentField) && (!control.value || control.value.length === 0)) {
        return {'required': errorMessage};
      }

      return null;
    };
  }

  greaterThanEqualTo(config: FieldNameConfig, message: string = 'Field must be greater than or equal to related field'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value;
      const relatedFieldControl = control.parent && control.parent?.get(config.fieldName);
      const relatedFieldValue = relatedFieldControl?.value;

      if (fieldValue !== null && relatedFieldValue !== null && fieldValue < relatedFieldValue) {
        return {greaterThanEqualTo: {valid: false, message}};
      }

      return null;
    };
  }


  greaterThan(config: FieldNameConfig): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value;
      const relatedFieldControl = control.parent && control.parent.get(config.fieldName);
      const relatedFieldValue = relatedFieldControl?.value;

      if (fieldValue !== null && relatedFieldValue !== null && fieldValue <= relatedFieldValue) {
        return {greaterThan: true};
      }

      return null;
    };
  }


  lessThanEqualTo(config: FieldNameConfig): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const relatedFieldControl = control.parent && control.parent?.get(config.fieldName);
      const relatedFieldValue = relatedFieldControl?.value;

      if (value !== null && relatedFieldValue !== null && value > relatedFieldValue) {
        return {lessThanEqualTo: true};
      }

      return null;
    };
  }

  lessThan(config: { fieldName: string }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const relatedFieldControl = control.parent && control.parent?.get(config.fieldName);
      const relatedFieldValue = relatedFieldControl?.value;

      if (value !== null && relatedFieldValue !== null && value >= relatedFieldValue) {
        return {lessThan: true};
      }

      return null;
    };
  }
}

