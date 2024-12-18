import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  constructor(private apiService: ApiService) {}

  async loginWithGoogle(): Promise<void> {
    // Initialize Google Sign-In
    const auth2 = await this.loadGoogleAuth();
    const googleUser = await auth2.signIn();
    const idToken = googleUser.getAuthResponse().id_token;
    
    // Send token to backend
    return this.apiService.loginWithGoogle(idToken).toPromise();
  }

  private loadGoogleAuth(): Promise<any> {
    return new Promise((resolve) => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: 'YOUR_GOOGLE_CLIENT_ID'
        }).then(resolve);
      });
    });
  }
}