import { AbstractControl, ValidationErrors } from '@angular/forms';
  
export class RegexValidator {
    static mailFormat(control: AbstractControl) : ValidationErrors | null {
        const regex = /^[^<>()[\]\\,;:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(control.value)){               
            return {mailFormat: true}
        }
        return null;
    }

    static numberFormat(control: AbstractControl) : ValidationErrors | null {
        const regex = /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/;
        const regex2 = /^[0-9]+$/;
        if (!regex2.test(control.value)){
            return {numberFormat: true}
        }
        return null;
    }
}

export class InputValidator {
    static validateNumber(control: AbstractControl) : ValidationErrors | null {
        if (control.value === null) return null;
        // check to see if the control value is no a number
        if (isNaN(control.value)) {
            return null;
        }
        return null; 
    }
}