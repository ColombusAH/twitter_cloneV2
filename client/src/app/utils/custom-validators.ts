import { FormGroup, AbstractControl } from '@angular/forms';
const minLenRequired = 8;

export function passwordsMatchValidator(
  group: FormGroup
): { [key: string]: boolean } | null {
  const pass = group.get('password').value as string;
  const confirmPass = group.get('confirmPassword').value as string;
  return pass === confirmPass ? null : { notMatch: true };
}

export function passwordComplexityValidator(
  passwordControl: AbstractControl
): {
  [key: string]: boolean;
} | null {
  const pass = passwordControl.value as string;
  let haveUpperCase = false;
  let haveNumber = false;
  [...pass].forEach(c => {
    if (!isNaN(+c)) {
      haveNumber = true;
    }
    if (c === c.toUpperCase()) {
      haveUpperCase = true;
    }
  });

  if (pass.length >= minLenRequired && haveNumber && haveUpperCase) {
    return null;
  } else {
    return { passwordNotValid: true };
  }
}
