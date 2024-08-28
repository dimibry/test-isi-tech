import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmPasswordKey)?.value;

    if (!confirmPassword) {
      control.get(confirmPasswordKey)?.setErrors({ required: true })
    }

    if (confirmPassword && password !== confirmPassword) {
      control.get(confirmPasswordKey)?.setErrors({ passwordMismatch: true })
      return { passwordMismatch: true };
    }

    return null;
  };
}
