import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ReactiveErrorsService {

  constructor() { }


  hasError(controlName: string,form:FormGroup): boolean {
    const control = form.get(controlName);
    return (control?.touched && control?.errors !== null) ? true : false;
  }

  getErrorMessage(controlName: string, form: FormGroup): string | null {
    const control = form.get(controlName);
    const errorMessages: { [key: string]: string } = {
      'required': 'This field is required',
      'email': 'Invalid email format',
      'max': 'Max number can be 6',
      'min': 'Min number is 1',
      'minlength': 'Minimum length is 6',
      'maxlength': 'Maximum length is 50',
      'pattern': 'Pattern does not match'
    };

    if (control && (control.touched || control.dirty) && control.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      const errorObj = control.errors[firstErrorKey];

      // Check if the error object is a string (which means it's a custom error message)
      if (typeof errorObj === 'string') {
        return errorObj;
      }

      // Check if the error object has a 'message' property (which means it's a custom error message)
      if (typeof errorObj === 'object' && 'message' in errorObj) {
        return errorObj.message;
      }

      // Otherwise, use the default error message
      return errorMessages[firstErrorKey] || null;
    }

    return null;
  }


}
