import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class FormValidator {
    static validatePassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
          const forbidden = pattern.test(control.value);
          return !forbidden ? {invalidPassword: {value: control.value}} : null;
        };
    }
}