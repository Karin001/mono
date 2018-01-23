import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenWordValidator(word: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const match = word.test(control.value);
    return match ? null : {'forbiddenWord': {value: control.value}} ;
  };
}
