import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-auth-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-3">
      <button
        type="button"
        (click)="onGoogleLogin.emit()"
        class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <img src="assets/google-icon.svg" alt="Google" class="h-5 w-5 mr-2">
        Continue with Google
      </button>

      <button
        type="button"
        (click)="onFacebookLogin.emit()"
        class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <img src="assets/facebook-icon.svg" alt="Facebook" class="h-5 w-5 mr-2">
        Continue with Facebook
      </button>
    </div>

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">Or continue with</span>
      </div>
    </div>
  `
})
export class SocialAuthButtonsComponent {
  @Output() onGoogleLogin = new EventEmitter<void>();
  @Output() onFacebookLogin = new EventEmitter<void>();
}