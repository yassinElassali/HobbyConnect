import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessagesComponent } from '../shared/validation-messages.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessagesComponent],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          formControlName="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter your email"
        >
        <app-validation-messages
          [control]="loginForm.get('email')"
          [messages]="{
            required: 'Email is required',
            email: 'Please enter a valid email'
          }"
        ></app-validation-messages>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          formControlName="password"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter your password"
        >
        <app-validation-messages
          [control]="loginForm.get('password')"
          [messages]="{
            required: 'Password is required',
            minlength: 'Password must be at least 8 characters'
          }"
        ></app-validation-messages>
      </div>

      <button
        type="submit"
        [disabled]="!loginForm.valid || isSubmitting"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {{ isSubmitting ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  `
})
export class LoginFormComponent {
  @Output() formSubmit = new EventEmitter<{email: string, password: string}>();
  
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit(this.loginForm.value);
    }
  }
}