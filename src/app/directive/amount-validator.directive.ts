import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[amountValidator]'
})
export class AmountValidatorDirective implements Validator {

  constructor() { }

  validate(c: FormControl): ValidationErrors | null {
    // Here we call our static validator function 
    return this.validateAmount(c);
  }

  validateAmount(control: FormControl): ValidationErrors {
    if (! (control.value.startsWith('37') 
           || control.value.startsWith('4') 
           || control.value.startsWith('5'))
     ) {
        // Return error if card is not Amex, Visa or Mastercard     
        return {creditCard : 'Your credit card number is not from a supported credit card provider'};
     } else if (control.value.length !== 16) {
        // Return error if length is not 16 digits
        return {creditCard : 'A credit card number must be 16-digit long'};}
    // If no error, return null  
    return null;
 }

}
