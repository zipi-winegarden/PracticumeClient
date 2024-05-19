
import { FormControl } from '@angular/forms';

export function onlyLettersValidator(control: FormControl) {
  const value = control.value;

  if (!value || value === '') {
    return { required: true };
  }

  const regex = /^[a-zA-Z]+$/;

  if (!regex.test(value)) {
    return { invalidtext: true };
  }

  return null;
}
