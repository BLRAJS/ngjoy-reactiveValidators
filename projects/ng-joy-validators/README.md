# ngJoyValidators - Angular Reactive Custom Validators

Welcome to `ngJoyValidators`!  This feature-packed library serves up advanced and conditional validation features for your Angular reactive forms. Compatible with Angular versions 12 through 16, it's super light on size but heavy on functionality and flexibility. Packed with a suite of around 43 validators and a bonus set of 7 conditional validators for tackling more complex scenarios, `ngJoyValidators` has all your reactive form needs under control.

## 🚀 What can ngJoyValidators do?


Here's a taste of what you can expect:

- ⚡ **Efficiency**: `ngJoyValidators` is designed to be light on resources. Despite offering a rich feature set, it has zero internal third-party dependencies and maintains a small footprint.

- 🎨 **Customizable**: We believe in flexibility. That's why our validators are highly customizable, ready to accommodate the unique requirements of your project.

  🧩 **Conditional Validators**: you won't find anywhere else



## 📚 Demo Project

To help you get started and showcase what `ngJoyValidators` is capable of, we've put together an Angular workspace project complete with components demonstrating several validators. Whether you're new to `ngJoyValidators` or looking to explore more advanced use-cases, our demo project is a great place to start.
https://github.com/BLRAJS/ngjoy-reactiveValidators


## 💾 Installation

To add `ngJoyValidators` to your project, simply run the following command in your terminal:

```npm i @ngjoy.dev/reactivevalidators ```

## Import modules
To utilize form features, import the FormsModule, ReactiveFormsModule, and **NgJoyValidatorsModule** into your NgModule decorator.
```js 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';// <-- #1
import { NgJoyValidatorsModule } from '@ngjoy.dev/reactivevalidators';
import { AppComponent } from './app.component'; 

 @NgModule({    
 declarations:[AppComponent],   
  imports:[ BrowserModule, FormsModule, ReactiveFormsModule, NgJoyValidatorsModule ],  
 bootstrap: [AppComponent] 
 }) 
 
export class AppModule { }   
```   

## In your component
just add NgJoyValidatorsService and you  have access to all validators
```js 
import {NgJoyValidatorsService} from "@ngjoy.dev/reactivevalidators";

constructor(private ngJoyValidatorsService: NgJoyValidatorsService) {
}
```   

## Reactive Form Validation

🧩 **Conditional Validators**: One of the unique features of `ngJoyValidators` is the ability to add / remove / compare/ disable  / co-require  on or more validators conditionally based on a dependency value from another field or same fields.


1. [conditionalValidators](#conditionalvalidators)
2. [coRequiredValidator](#corequiredvalidator)
3. [conditionalRequiredValidator](#conditionalrequiredvalidator)
4. [greaterThan](#greaterthan)
5. [lessThanEqualTo](#lessthanequalto)
6. [greaterThanEqualTo](#greaterthanequalto)
7. [lessThan](#lessthan)


🌈 **Versatility**: With around 50 validators at your disposal, you'll have a tool for nearly every situation. No matter the complexity of your form or the specific rules you need to enforce, `ngJoyValidators` has got you covered.

8. [ibanValidator](#ibanvalidator)
9. [creditCard](#creditcard)
10. [cvv](#cvv)
11. [expiryDate](#expiryDate)
12. [sumOfFields](#sumoffields)
13. [asciiValidator](#asciivalidator)
14. [allFieldsFilled](#allfieldsfilled)
15. [minMaxArrayLength](#minmaxarraylength)
16. [scriptLanguageType](#scriptlanguagetype)
17. [sanitizeInput](#sanitizeinput)
18. [digitValidator](#digitvalidator)
19. [emailDomain](#emaildomain)
20. [endsWith](#endswith)
21. [even](#even)
22. [extension](#extension)
23. [factor](#factor)
24. [file](#file)
25. [fileSize](#filesize)
26. [ip](#ip)
27. [noWhitespace](#nowhitespace)
28. [json](#json)
29. [latitude](#latitude)
30. [latLong](#latlong)
31. [leapYear](#leapyear)
32. [longitude](#longitude)
33. [lowerCase](#lowercase)
34. [mac](#mac)
35. [maxDate](#maxdate)
36. [maxNumber](#maxnumber)
37. [minDate](#mindate)
38. [minNumber](#minnumber)
39. [numeric](#numeric)
40. [odd](#odd)
41. [oneOf](#oneof)
42. [password](#password)
43. [port](#port)
44. [primeNumber](#primenumber)
45. [range](#range)
46. [startsWith](#startswith)
47. [time](#time)
48. [unique](#unique)
49. [upperCase](#uppercase)
50. [url](#url)



## conditionalValidators
The `conditionalValidators` function is a validator factory that attaches validators to a form control conditionally. The conditions are based on the value of another form control in the same form group.

Use Cases:

1.  **Dependent Form Fields**: This function can be used in cases where the validation of a form field depends on the value of another field. For instance, let's say we have a form with a "country" select field and a "state" input field. The "state" field should be required only if the "country" field is set to "United States". In this case, the conditionalValidators function can be used to add the `Validators.required` validator to the "state" field only if the "country" field value is "United States".

2.  **Dynamic Form Validation**: In cases where the form validation requirements change based on the user's input, this function allows developers to easily apply different validation rules on-the-fly. For example, in a checkout form, if the user selects "credit card" as the payment method, the form needs to validate credit card related fields, but if "paypal" is selected, those validations are not necessary.


The function can take an optional `conditionalCheck` function. This function can be used to provide a custom condition instead of the default one. The custom condition could be based on complex logic involving multiple form controls.

> Reactive Form Validation
```js 
// In a registration form, the conditionalValidators function is used to apply the Validators.
// required validator on the promoCode text field only when the hasPromoCode checkbox is checked.
this.registrationForm = this.fb.group({ 
  hasPromoCode: [false],  
  promoCode: ['', this.conditionalValidators<boolean>( 'hasPromoCode', Validators.required, value => value === true )]
});

// In an article submission form, the conditionalValidators function applies Validators.required 
// and Validators.min(1) on the imageCount field only if the hasImages checkbox is checked. 
// This ensures that a user enters the number of images (greater than 0) only when they've 
// indicated they are including images.
this.articleForm = this.fb.group({ 
  hasImages: [false],  
  imageCount: ['', this.conditionalValidators<boolean>( 'hasImages', 
    [Validators.required, Validators.min(1)], value => value === true )] 
});  

// The studentForm has three fields: 'age' (required), 'isStudent' (optional), 
// and 'guardianContact' which is required only when the user is a student and their 
// age is less than 18.
this.studentForm = this.fb.group({ 
  age: ['', Validators.required],  
  isStudent: [false],  
  guardianContact: ['', this.conditionalValidators<boolean>( 'isStudent', [Validators.required],  
 (isStudent, formControl) => isStudent && formControl.parent?.get('age')?.value < 18 )]
});  
  
// The testGroup form contains two fields: 'firstName' and 'email'. The 'email' field is 
// conditionally required and must end with 'gmail.com' only when the 'firstName' field is 
// filled with "James" or the 'email' itself includes "test".
this.testGroup = this.fb.group({
  firstName: [''],  
  email: ['', [this.ngJoyDynamicValidatorsService.conditionalValidators<string>('firstName',    
  [Validators.required, this.ngJoyValidatorsService.endsWith('gmail.com', "Only gmail.com please")],    
  (value: any,emailControl:FormControl) => value === "James" || emailControl.value.includes("test"))]]
});

 //In an online product listing form, certain fields like product details and review comments
// become conditionally required based on the type of product and its rating, showcasing the
// dynamic nature and flexibility of conditionalValidators.

this.productListingForm = this.fb.group({
  productName: ['', Validators.required],
  productPrice: ['', [Validators.required, Validators.min(1)]],
  productCategory: ['', Validators.required],
  productDetails: ['', this.conditionalValidators<string>('productCategory',
      [Validators.required],
      (productCategory) => productCategory === 'electronics' || productCategory === 'books'
  )],
  productRating: [5, [Validators.min(1), Validators.max(5)]],
  reviewComments: ['', this.conditionalValidators<number>('productRating',
      [Validators.required],
      (productRating) => productRating < 3
  )],
  hasPromotion: [false],
  promotionPrice: ['', this.conditionalValidators<boolean>('hasPromotion',
      [Validators.required, Validators.min(1)],
      (hasPromotion, formControl) => hasPromotion === true && formControl.value < formControl.parent?.get('productPrice')?.value
  )],
  hasShipping: [true],
  shippingCost: ['', this.conditionalValidators<boolean>('hasShipping',
      [Validators.required, Validators.min(0)],
      (hasShipping, shippingControl) => hasShipping === true && ((shippingControl.value > 0 && shippingControl.value < formControl.parent?.get('productPrice')?.value * 0.1) || shippingControl.value === 0)
  )]
});

// let's break it down!

// productCategory: This is a field in which the seller is required to input the category of 
// the product they're listing. It could be any string, but for the purpose of this form, 
// we're considering the validation for 'electronics' and 'books'.

// productDetails: This field is a conditional field that's dependent on the productCategory. 
// As per our form design, detailed product information is necessary when the product belongs 
// to 'electronics' or 'books' category. This is implemented using conditionalValidators, which
// make productDetails a required field only when the productCategory is either 'electronics' 
// or 'books'.

//productRating: This field represents the rating of the product, where the seller can 
// specify a rating between 1 and 5.

//reviewComments: This is another conditional field that depends on the productRating. 
// If the productRating is less than 3, the form expects the seller to provide review 
// comments to justify this low rating. Again, conditionalValidators is at work here, 
// making reviewComments a required field only when the productRating is less than 3.

//Now, why is this so amazing? The power and flexibility of conditionalValidators lie in their 
// ability to adapt to different conditions, enhancing the dynamics of form validation.

  //It allows you to handle multiple scenarios within your form, reducing the complexity and
// the number of checks you would have to perform otherwise. It provides a highly flexible
// approach to handle form validation by not only allowing conditions based on other fields'
// values, but also based on the field's own value, like we did with promotionPrice and 
// shippingCost.

 // In addition, by providing an easier way to create dynamic forms, it enhances the user 
// experience. It only enforces validation rules when it's needed, avoiding unnecessary inputs 
// from users, and making the form filling process more intuitive and efficient. 
// This is particularly beneficial in complex forms with many fields and rules.

//In summary, conditionalValidators is a supercharged validation mechanism that brings both 
// power and flexibility to your forms, making them smarter, more dynamic, and user-friendly.
// It's a great tool for developers to create advanced forms with complex validation scenarios.
```   
___ 
## conditionalRequiredValidator
This `conditionalRequiredValidator` function is a custom validation function in Angular. It checks whether a certain field is required based on the condition evaluated on another dependent field.
> Reactive Form Validation
```js 
//first use Case  
this.sampleForm = this.fb.group({ 
 checkbox: [false],  
 checkboxDependent: [null, this.conditionalRequiredValidator( 'checkbox', control => control.value === true)] 
});   
 
//second use case  
this.sampleForm = this.fb.group({ 
  selectField: ['defaultOption'],  
  dependentField: [null, this.conditionalRequiredValidator( 'selectField', control => control.value === 'specificOption','This field is required when specific option is selected in the dropdown.' )] 
});  
```   

___ 
## coRequiredValidator
coRequiredValidator is a custom validator that checks if at least one of a group of controls has a value. This could be useful when you have a situation where a user must provide at least one type of contact information, such as a phone number or an email, but you don't mind which one they provide
> Reactive Form Validation
```js
this.demoForm = this.fb.group({    
  email: ['',[this.ngJoyDynamicValidatorsService.coRequiredValidator('email', 'phone', 'Either field1 or field2 is required.')]],    
  phone: ['',[this.ngJoyDynamicValidatorsService.coRequiredValidator('email', 'phone', 'Either field1 or field2 is required.')]]
});  
``` 
___   
## ibanValidator
The `ibanValidator` function is a validator function for International Bank Account Numbers (IBAN). It takes an optional error message object as a parameter and returns a `ValidatorFn` that is used to validate form controls. The following are the key steps that this function is performing:

1.  **Extracting Country Code**: It starts by extracting the country code from the IBAN. The country code in an IBAN is always the first two characters.

2.  **Country Support**: The function checks if the country code extracted from the IBAN is supported or not. This is done by checking the `ibanCountries`

3.  **Length Check**: Next, it checks if the length of the IBAN matches the length defined for the country in the `ibanCountryLengths` object.

4.  **Rearranging and Converting Characters to Numbers**: If the country is supported and the length is valid, the function then rearranges the IBAN by moving the first four characters to the end. This is followed by converting any letters in the IBAN to their equivalent numeric values.

5.  **Performing Mod-97 Operation**: The validator then performs a Modulo-97 operation on the resulting number. This is an essential part of the IBAN validation as per the international standard.

6.  **Final Validation Check**: Finally, if the remainder from the Mod-97 operation equals '1', the function concludes that the IBAN is valid, otherwise, it returns an error.


This function follows the official procedure for validating an IBAN and provides detailed error messages when the validation fails at any step. This allows for better debugging and user feedback.
> Reactive Form Validation
```js
 this.paymentForm = this.fb.group({     
  iban: ["",[this.ngJoyValidators.ibanValidator()]]  
});   
``` 
___   
## creditCard
The validation process involves a few steps:

1. The function first checks if the control's value is not empty. If it's empty, it returns null, indicating no errors.
2. Next, it checks if the input value consists only of digits. If the input contains non-digit characters, it's considered invalid and an error message is returned.
3. Then, the function checks if the credit card type is detectable based on the card type  -
- American Express (amex)
- China UnionPay (china_union)
- Dankort (dankort)
- Diners Club (diners)
- Discover (discover)
- Elo (elo)
- Hipercard (hipercard)
- JCB (jcb)
- Maestro (maestro)
- Mastercard (mastercard)
- Visa (visa)
- MIR (mir)
- NSPK (nspk)
- Troy (troy)
- Visa Electron (visa_electron)
- RuPay (rupay)
- Interpayment (interpayment)
- Instapayment (instapayment)
- Aura (aura)
- CardGuard (cardguard)  
  If the card type can't be determined, the function returns an error message, considering the input invalid.
5. Lastly, the function runs Luhn's algorithm on the input. Luhn's algorithm is a common checksum algorithm used to validate a variety of identification numbers, especially credit card numbers. If the card number fails this checksum test, it is considered invalid and an error message is returned.
6. If the input passes all these tests, the function returns null, indicating no errors in the input, and hence the credit card number is valid.

So, in essence, this function validates if the entered credit card number is formatted correctly  , it match a type , and if it could be a plausible credit card number by applying the Luhn algorithm.
> Reactive Form Validation
```js
 this.paymentForm = this.fb.group({    
  cardNumber: ['', [this.ngJoyValidators.creditCard('Please enter a valid card number.')]]  
});   
```   

## sumOfFields
The `sumOfFields` function is a  validator that validates if the sum of specified fields in a FormGroup matches an expected value. Here's how it works:

1.  **Fetch Field Values**: It first maps over the array of field names (passed as `fields`), using the `get` method on the `group` object (which is the FormGroup the validator is attached to) to retrieve the corresponding form controls. It gets the value from each control, parsing it as a float if it exists, or using 0 if the control is not present or its value is falsy.

2.  **Calculate Total Sum**: It then reduces this array of field values into a single sum (i.e., it adds all of the values together).

3.  **Compare With Expected Value**: It compares this sum to the `sumValue` parameter that was passed in. If they are not equal, it returns a validation error with the provided `errorMessage`. If they are equal, it returns null, signifying no error.


This function can be useful when you have a form where certain fields need to add up to a specific total. For example, it might be used in a budgeting app where the user is inputting amounts for different categories, and you want to make sure they add up to the total budget
> Reactive Form Validation
```js 
this.myForm = this.fb.group({   
 field1: [0],  
 field2: [0],
 field3: [0],
 field4: [0]
   }, { validators: this.validationService.sumOfFields(['field1', 'field2', 'field3'], 100, 'The sum of fields must be 100.') }  
);   
``` 
___   
## asciiValidator
Allows user to enter the input which is in ascii format only.
> Reactive Form Validation
```js
 firstName: ['', [    
  this.validationService.asciiValidator('Name can only contain ASCII characters.'),
 ]],  
``` 
___   
## allFieldsFilled
The `allFieldsFilled` function is a custom validator that checks if all the controls within a FormArray are valid. A FormArray in Angular represents an array of AbstractControl, where each control in the array can be a FormGroup, FormControl, or another FormArray.

When this validator is used on a FormArray, it iterates through all the controls in the array. If it finds any control that is not valid (i.e., fails validation checks specified on that control), it will return an error object `{allFieldsFilled: {valid: false, message}}`. Here `valid` is set to `false`, indicating that the validation failed and `message` is the error message you pass when calling `allFieldsFilled()` method.

If all the controls in the FormArray are valid, it will return `null`, which means there is no error and the validation passed successfully.

This validator can be useful when you have a dynamic form where users can add or remove fields (or sets of fields), and you want to ensure that every field in the form is filled before the form is submitted.
> Reactive Form Validation
```js
 aliases: this.fb.array([    
   this.fb.control('')
  ],
    {validators: [this.ngJoyValidatorsService.allFieldsFilled()]
 })   
``` 
___ 
## minMaxArrayLength
The `minMaxArrayLength` function is a custom validator in Angular that checks if the length of an array falls within a specified range, defined by the `min` and `max` parameters. This validator can be used for validating FormArray instances in Angular forms.
> Reactive Form Validation
```js
 aliases: this.fb.array([    
   this.fb.control('')
   ], {validators: [this.ngJoyValidatorsService.minMaxArrayLength(3, 7, "Min 3 aliases", "Max 7 aliases")]
})  
``` 
___   
## creditCard
creditCard validation will check property value is creditcardtype or not, It will not allow to enter any value other than credit card format.

| Card Type | Card Number | Expiry Date | CVV |  
| --------- | ----------- | ----------- | --- |  
| American Express (Amex) | 3700 0000 0000 002 | 03/2030 | 7373 |  
| China UnionPay | 6243 0300 0000 0001 | 12/2029 | 737 |  
| Dankort | 5019 5555 4444 5555 | 03/2030 | 737 |  
| Diners | 3600 6666 3333 44 | 03/2030 | 737 |  
| Discover | 6011 6011 6011 6611 | 03/2030 | 737 |  
| Elo | 5066 9911 1111 1118 | 03/2030 | 737 |  
| Hipercard | 6062 8288 8866 6688 | 03/2030 | 737 |  
| JCB | 3569 9900 1009 5841 | 03/2030 | 737 |  
| Maestro | 6771 7980 2100 0008 | 03/2030 | 737 |  
| Mastercard | 5555 3412 4444 1115 | 03/2030 | 737 |  
| Visa | 4166 6766 6766 6746 | 03/2030 | 737 |  
| Mir | 2200 0000 0000 0002 | 03/2030 | 737 |  
| Troy | 9792 0000 0000 0000 | 03/2030 | 737 |  
| UATP | 1354 1234 5678 911 | 03/2030 | 737 |  
| RuPay | 6521 5115 9161 3100 | 03/2030 | 737 |  
| Interpayment | 6360 2900 4907 3813 | 03/2030 | 737 |  
| InstaPayment | 6394 9394 9304 4961 | 03/2030 | 737 |  
| CardGuard | 5392 3192 3192 3190 | 03/2030 | 737 |  

> Reactive Form Validation
```js 
this.paymentForm = this.fb.group({    
  cardNumber: ['', [this.ngJoyValidators.creditCard('Please enter a valid card number.')]],    
  expiryDate: ['', [this.ngJoyValidators.expiryDate('Card has expired.')]],    
  cvv: ['', [this.ngJoyValidators.cvv('Invalid CVV.')]] 
});  
``` 
___   
## scriptLanguageType
This custom validator checks if the input text of a control follows a specific script (writing system). You specify the name of the script when using this validator and it will ensure that all characters in the input string are from that script.

In other words, you can use this validator to enforce that an input field should only contain characters from a certain script such as Latin, Cyrillic, Armenian, Greek, Arabic, Hebrew, Devanagari, Bengali, Thai, Chinese, Japanese Hiragana, Japanese Katakana, or Korean.
> Reactive Form Validation
```js
 scriptExample: ['', [    
  this.validationService.scriptLanguageType('Latin', 'Input must only contain Latin script characters.') 
]],  
``` 
___   
## sanitizeInput
This function provides a custom validator named `sanitizeInput`, which is used to check if the input of a form control contains any potentially harmful scripts, malicious code, or elements that could be used for cross-site scripting (XSS) attacks , this validator helps to sanitize user input by preventing the inclusion of harmful scripts or elements that could compromise the security of your web application.
> Reactive Form Validation
```js sanitizedInput: ['', [    
this.validationService.sanitizeInput('Input must not contain scripting.') ]],   
``` 
___   

## cvv
The CVV (Card Verification Value) validator ensures that the provided CVV is a valid 3-digit or 4-digit number, depending on the card type. If not, it returns a validation error.
> Reactive Form Validation
```js 
cvv: ['', [this.ngJoyValidators.cvv('Invalid CVV.')]]    
```  
___   

## expiryDate
This validator checks whether the given credit card expiration date (expressed in the format "MM/YYYY") has already passed or not. If the expiration date is in the past, it returns a validation error.
> Reactive Form Validation
```js 
  expiryDate: ['', [this.ngJoyValidators.expiryDate('Card has expired.')]],   
``` 
___  
## digitValidator
Can only contain digits. It will not allow any alphabets or special character.
> Reactive Form Validation
```js personalDigitNumber: ['', [    
this.validationService.digitValidator('Personal Digit Number can only contain digits.') ]],  
``` 
___   
## emailDomain
Checks if the input is a valid email address and its domain mustmatch specific domain
> Reactive Form Validation
```js email: ['', [    
  Validators.email,    
this.validationService.emailDomain(['example.com'], 'Email domain must be example.com.') ]],  
``` 
___   
## endsWith
Input value must ends with specifci value , _ is similar to Contains() , but validates only if the value is at the end of the input
> Reactive Form Validation
```js
 firstName: ['', [this.ngJoyValidatorsService.endsWith("lee", "You are not originally from Asia your name must end with ...lee")]],   
``` 
___   
## even
Value entered is an even number or not.
> Reactive Form Validation
```js
 evenField: ['', this.validationService.even('Value is not an even number.')],   
``` 
___   
## extension
Check the  proper extension format.
> Reactive Form Validation
```js
 extensionField: ['', this.validationService.extension(['png', 'jpg', 'gif'], 'File extension not allowed.')],   
```
 ___ 
## factor
check for dividend.
> Reactive Form Validation
```js
 factorField: ['', this.validationService.factor(100, 'Value is not a factor of 100.')],   
``` 
___   
## file
Allows user to validate maxFiles and minFiles for input type file
> Reactive Form Validation
```js
 fileField: ['', this.validationService.file(2, 5, 'Number of files is not within the specified range.')],   
``` 
___   
## fileSize
Validate the the maximum allowed upload size , for input type file
> Reactive Form Validation
```js
 fileSizeField: ['', this.validationService.fileSize(100000, 'File size exceeds the maximum allowed size.')],   
``` 
___   
## greaterThanEqualTo
custom validator that checks whether the value of the given form control is greater than or equal to the value of the specified related field. If it is less, it returns a validation error.
> Reactive Form Validation
```js    
  this.transactionForm = this.fb.group({  
  balance: [1000],
  newBalance: [0, [this.greaterThanEqualTo({fieldName: 'balance'}, "New balance cannot be less than the current balance")]],
  });  
``` 
___   
## greaterThan
Greater than checks whether the value of the given form control is strictly greater than the value of the specified related field. If it's less or equal, it returns a validation error.
> Reactive Form Validation
```js    
  this.transactionForm = this.fb.group({  
 balance: [1000], newBalance: [0, [this.greaterThan({fieldName: 'balance'}, "New balance cannot be greater than the current balance")]], });  
``` 
___   
## noWhitespace
noWhitespace validation will check for empty or white spaces.
> Reactive Form Validation
```js
 lastName: ['', [    
this.validationService.noWhitespace('Name can not contain whitespaces.') ]],  
``` 
___   
## ip
Checks if the input is a valid IPv4 or IPv6 address.
> Reactive Form Validation
```js
 ipField: ['', this.validationService.ip({versions: [4, 6]})],  
``` 
___   
## json
Check for  proper valid Json format.
> Reactive Form Validation
```js
 jsonField: ['', this.validationService.json("Invalid JSON format")]   
``` 
___   
## latitude
Check if value  is valid latitude.
> Reactive Form Validation
```js
 latitudeField: ['', this.validationService.latitude("Invalid latitude value")],   
``` 
___   
## leapYear
Check whether the value is a leap year or not.
> Reactive Form Validation
```js
 leapYearField: ['', this.validationService.leapYear("Not a leap year")],   
``` 
___   
## latLong
Check if value is  valid Latitude or longitude.
> Reactive Form Validation
```js
 latLongField: ['', this.validationService.latLong("Invalid latitude or longitude value")],  
``` 
___   
## lessThanEqualTo
Validator that checks whether the value of the given form control is less than or equal to the value of the specified related field. If it's more, it returns a validation error.
> Reactive Form Validation
```js    
  this.transactionForm = this.fb.group({  
 balance: [1000], withdrawal: [0, [this.lessThanEqualTo({fieldName: 'balance'}, "Withdrawal cannot exceed balance")]], });   
``` 
___   
## lessThan
validator that checks whether the value of the given form control is strictly less than the value of the specified related field. If it's more or equal, it returns a validation error.
> Reactive Form Validation
```js
 this.form = this.formBuilder.group({  
 startHour: [8], endHour: [12, this.Validators.lessThan({fieldName: 'startHour'})],});   
``` 
___   
## longitude
Check whether the value is a valid longitude   or not.
> Reactive Form Validation
```js 
longitudeField: ['', this.validationService.longitude("Invalid longitude value")],   
``` 
___   
## lowercase
Check whether the value is a lowercase  or not.
> Reactive Form Validation
```js 
lowerCaseField: ['', this.validationService.lowerCase("Only lowercase letters are allowed")],  
``` 
___   
## mac
value entered is a valid mac address.
> Reactive Form Validation
```js
 macField: ['', this.validationService.mac("Invalid MAC address")],  
``` 
___   
## maxDate
This function, `maxDate`, is a custom validator for Angular forms. It checks if the input date is less than or equal to a specified maximum date. The validator function takes a configuration object that specifies the maximum date value, date format, and an optional error message.
> Reactive Form Validation
```js 
maxDateField: ['', this.validationService.maxDate({    
  value: "02-06-2023",    
  format: "DD-MM-YYYY",    
  message: "Date must be less than or equal to the maximum date." })],   
``` 
___   
## maxNumber
Check for maximum number value parameter.
> Reactive Form Validation
```js
 maxNumberField: ['', this.validationService.maxNumber({value: 100})],  
``` 
___   
## minDate
It checks if the input date is less than or equal to a specified maximum date. The validator function takes a configuration object that specifies the maximum date value, date format, and an optional error message.
> Reactive Form Validation
```js
 minDateField: ['', this.validationService.minDate({    
  value: "01-01-2020",    
  format: "DD-MM-YYYY",    
message: "Date must be greater than or equal to the minimum date." })],   
``` 
___   
## minNumber
Check if  Input is greater than the minimum number value parameter.
> Reactive Form Validation
```js
 minNumberField: ['',this.validationService.minNumber({value: 10})],  
``` 
___   
## numeric
numeric validation will check whether the value entered is a valid numeric value , based on criteria we want
> Reactive Form Validation
```js 
  numericField: ['', this.validationService.numeric({    
   acceptValue: NumericValueType.PositiveNumber,    
   allowDecimal: true,    
   message:"Value must be a valid numeric value only" })
  ],   
``` 
___   
## odd
value entered is an odd number or not.
> Reactive Form Validation
```js 
oddField: ['', this.validationService.odd("Value must be an odd number only")],  
``` 
___   
## oneOf
Check whether the user has entered any one of the given inputs or not.
> Reactive Form Validation
```js 
lastName: ['', [this.ngJoyValidatorsService.oneOf(["Pacino", "Deniro", "Afleck"], "Your last name can be Pacino, Deniro, Afleck")]],  
``` 
___   
## password
Will allow user to enter input value according to correct password validation format.
> Reactive Form Validation
```js    
 password: ['', [this.ngJoyValidatorsService.password({  
 validation: { minLength: 5, maxLength: 10, digit: true, specialCharacter: true }, message: 'Password must have at least one digit, one special character, and be between 5 and 10 characters in length.' })
 ]],   
``` 
___   
## port
Test is the value entered is valid port number.
> Reactive Form Validation
```js 
portField: ['', 
this.validationService.port({message: 'Invalid port number.'})
],  
``` 
___   
## primeNumber
check if the value typed is  only prime number.
> Reactive Form Validation
```js
 primeNumberField: ['', this.validationService.primeNumber({message: 'Value must be a prime number.'})],  
``` 
___   
## range
Check if the  value is within the specific range
> Reactive Form Validation
```js 
age: ['', [this.ngJoyValidatorsService.range({    
minimumNumber: 18,    
maximumNumber: 65,    
message: "You are qualified to join the army if you are between 18 and 65" })
]],  
``` 
___   
## startsWith
Check if values starts with specific value.
> Reactive Form Validation
```js 
phone: ['', [this.ngJoyValidatorsService.startsWith("40", "You phone number must be Austrian ,must start with 40")]],   
``` 
___   
## time
Allow user to enter the input value is only in the correct time type.
> Reactive Form Validation
```js 
timeField: ['', this.validationService.time({format: '24'})],   
``` 
___   
## unique
The `unique` function is a  checks whether the value of the field it is applied to is unique within the scope of its sibling controls in the parent form array.

Here is a step-by-step description of what the function does:

1. It receives a custom error message as a parameter, with a default message of 'The value must be unique'.

2. It then accesses the value of the control to which it's applied.

3. The function assumes that the parent of the control is a form array, and attempts to retrieve it. If the form array or its controls are not available (for instance, if the control is not part of a form array), it returns `null`, indicating no validation errors.

4. The function then iterates over each control in the parent form array, excluding the current control.

5. It creates an array of values for these sibling controls and checks if the array contains a value that matches the value of the current control.

6. If it finds any matching values, it means that the value of the current control is not unique. The function then returns an error object with the error message.

7. If no matching values are found, it means that the value of the current control is unique within the form array. The function returns `null`, indicating no validation errors.


In summary, this function is used to ensure that a value entered into a control in a form array is unique among the values of its sibling controls.
> Reactive Form Validation
```js
 this.aliases.push(this.fb.control('',[this.ngJoyValidatorsService.unique()]));  
``` 
___   
## upperCase
Will allow user to enter only upperCase.
> Reactive Form Validation
```js 
upperCaseField: ['', this.validationService.upperCase({message:"Value must be in uppercase"})],  
``` 
___   
## url
Check that value entered in the property is in the correct ftp|http|https format or not.
> Reactive Form Validation
```js
 website: ['', [    
this.validationService.url({message: 'Website must be a valid URL.'})
 ]],   
```   
## Compare Password
Check whether the value of two formControls are same or not .Below  is an example of comparing password but is can used for any controller type
> Reactive Form Validation
```js
 password: ['', [this.ngJoyValidatorsService.password({    
  validation: {    
  minLength: 5,    
  maxLength: 10,    
  digit: true,    
  specialCharacter: true    
  },message: 'Password must have at least one digit, one special character, and be between 5 and 10 characters in length.'
   }), 
  Validators.required]],
 repeatPass: ['', [this.ngJoyValidatorsService.compare('password'), Validators.required]

```   
## Upcoming Form Validations
1. BIC (Bank Identifier Code) Validator
2. Phone Number Validator

## Goal
To create the best client-side angular reactive validations , supports rapid development of forms with advanced and complex validations, and simplifies the implementation process with concise coding.

## Contributing
Cool, you're thinking of helping improve this library? That's awesome! No contribution is too small - from a single character tweak to major code or doc updates. Even if you're not quite ready to write code or docs, you can still chip in by reporting issues or testing patches. Every bit helps!

## Need Help
Please ask your questions , https://ngjoy.dev

## Feature Request
You can request a new feature by contacting me https://ngjoy.dev

## License
MIT
