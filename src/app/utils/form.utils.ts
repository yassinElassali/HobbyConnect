import { AbstractControl, ValidationErrors } from '@angular/forms';

export function getControlErrors(control: AbstractControl | null): ValidationErrors | null {
  if (!control || !control.errors || !control.touched) {
    return null;
  }
  return control.errors;
}

export function isFieldInvalid(control: AbstractControl | null): boolean {
  return !!control?.errors && control?.touched;
}

export function getErrorMessage(error: string, params?: any): string {
  const errorMessages: { [key: string]: string } = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: `Minimum length is ${params?.requiredLength} characters`,
    maxlength: `Maximum length is ${params?.requiredLength} characters`,
    passwordMismatch: 'Passwords do not match',
    pattern: 'Invalid format'
  };

  return errorMessages[error] || 'Invalid input';
}