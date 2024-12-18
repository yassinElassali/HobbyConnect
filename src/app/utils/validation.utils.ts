import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordStrengthValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;

  if (!value) {
    return null;
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumeric = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*]/.test(value);

  const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

  return !passwordValid ? {
    passwordStrength: {
      hasUpperCase,
      hasLowerCase,
      hasNumeric,
      hasSpecialChar,
    }
  } : null;
};

export const usernameValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const valid = /^[a-zA-Z0-9_-]*$/.test(control.value);
  return !valid ? { invalidUsername: true } : null;
};