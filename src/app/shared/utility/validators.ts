import { ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = /^[(]{0,1}[0-9]{1,2}[)]{0,1}[0-9]{6,8}$/g.test(control.value);
        return valid || Validators.required(control) !== null ? null : { 'phone': 'The phone number is not valid.' };
    };
}
export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm.test(control.value);
        return forbidden || Validators.required(control) !== null ?  null : { 'email': 'The email is not valid.' };
    };
}

export function required(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return Validators.required(control) === null ? null : { 'required': 'This field is required.' };
    };
}
// export function maxLength(length: number): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//         return Validators.required(control) === null ? null : { 'maxLength': 'This field exceeds maximun length: ${length} characters.' };
//     };
// }

