import { AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from "../models/user.interface";

export function uniqueUsernameValidator(users: User[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    const username = control.value;
    let isUnique = true;
    users.forEach((u: User) => {
      if (u.username === username) {
        isUnique = false;
      }
    })
    return isUnique ? null : { uniqueUsernameError: true };
  };
}
