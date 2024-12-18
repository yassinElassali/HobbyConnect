import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessagesComponent } from '../shared/validation-messages.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-request-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessagesComponent],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        
        <div *ngIf="isSuccess" class="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Password reset instructions have been sent to your email.
        </div>

        <form *ngIf="!isSuccess" [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="space-y-4">
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
              [control]="resetForm.get('email')"
              [messages]="{
                required: 'Email is required',
                email: 'Please enter a valid email'
              }"
            ></app-validation-messages>
          </div>

          <button
            type="submit"
            [disabled]="!resetForm.valid || isSubmitting"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Reset Instructions' }}
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-gray-600">
          Remember your password?
          <a routerLink="/login" class="text-indigo-600 hover:text-indigo-500">Login here</a>
        </p>
      </div>
    </div>
  `
})
export class RequestResetComponent {
  resetForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isSubmitting = true;
      this.authService.requestPasswordReset(this.resetForm.value.email).subscribe({
        next: () => {
          this.isSuccess = true;
          this.isSubmitting = false;
        },
        error: () => {
          this.isSubmitting = false;
          // Handle error
        }
      });
    }
  }
}