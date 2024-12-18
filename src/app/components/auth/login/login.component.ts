import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginFormComponent } from './login-form.component';
import { SocialAuthButtonsComponent } from '../social/social-auth-buttons.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, SocialAuthButtonsComponent],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Login to HobbyConnect</h2>
        
        <app-social-auth-buttons
          (onGoogleLogin)="handleGoogleLogin()"
          (onFacebookLogin)="handleFacebookLogin()"
        ></app-social-auth-buttons>
        
        <app-login-form
          (formSubmit)="handleFormSubmit($event)"
        ></app-login-form>

        <div class="mt-4 text-center space-y-2">
          <p class="text-sm text-gray-600">
            <a routerLink="/reset-password" class="text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </p>
          <p class="text-sm text-gray-600">
            Don't have an account?
            <a routerLink="/register" class="text-indigo-600 hover:text-indigo-500">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  handleFormSubmit(credentials: { email: string; password: string }): void {
    this.authService.login(credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.error('Login failed:', error)
    });
  }

  handleGoogleLogin(): void {
    this.authService.loginWithGoogle().catch(error => {
      console.error('Google login failed:', error);
    });
  }

  handleFacebookLogin(): void {
    this.authService.loginWithFacebook().catch(error => {
      console.error('Facebook login failed:', error);
    });
  }
}