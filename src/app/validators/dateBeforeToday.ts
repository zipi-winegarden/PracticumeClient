
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate > today) {
      return { 'invalidBirthDate': true };
    }
    return null;
  };
}
