import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationMessagesComponent } from '../shared/validation-messages.component';
import { AuthService } from '../../../services/auth.service';
import { passwordMatchValidator } from '../../../validators/password-match.validator';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessagesComponent],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Set New Password</h2>

        <form [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter new password"
            >
            <app-validation-messages
              [control]="resetForm.get('password')"
              [messages]="{
                required: 'Password is required',
                minlength: 'Password must be at least 8 characters'
              }"
            ></app-validation-messages>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              formControlName="confirmPassword"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Confirm new password"
            >
            <app-validation-messages
              [control]="resetForm.get('confirmPassword')"
              [messages]="{
                required: 'Please confirm your password',
                passwordMismatch: 'Passwords do not match'
              }"
            ></app-validation-messages>
          </div>

          <button
            type="submit"
            [disabled]="!resetForm.valid || isSubmitting"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {{ isSubmitting ? 'Updating...' : 'Update Password' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isSubmitting = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.validateResetToken(this.token).subscribe({
      next: (isValid) => {
        if (!isValid) {
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isSubmitting = true;
      this.authService.resetPassword(this.token, this.resetForm.value.password).subscribe({
        next: () => {
          this.router.navigate(['/login'], {
            queryParams: { resetSuccess: true }
          });
        },
        error: () => {
          this.isSubmitting = false;
          // Handle error
        }
      });
    }
  }
}