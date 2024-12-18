import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="userData.email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter your email"
            >
          </div>

          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="userData.username"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Choose a username"
            >
          </div>

          <div>
            <label for="displayName" class="block text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              [(ngModel)]="userData.displayName"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter your display name"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Choose a password"
            >
          </div>

          <button
            type="submit"
            [disabled]="!registerForm.form.valid"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <a routerLink="/login" class="text-indigo-600 hover:text-indigo-500">Login here</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  userData: Partial<User> = {
    email: '',
    username: '',
    displayName: '',
    interests: []
  };
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        // Handle error (show message to user)
      }
    });
  }
}