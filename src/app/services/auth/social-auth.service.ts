import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SocialUser } from '../../models/social-user.model';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  loginWithGoogle(): Promise<void> {
    return this.initializeGoogleAuth()
      .then(() => this.performGoogleLogin());
  }

  loginWithFacebook(): Promise<void> {
    return this.initializeFacebookAuth()
      .then(() => this.performFacebookLogin());
  }

  private initializeGoogleAuth(): Promise<void> {
    return new Promise((resolve) => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: environment.googleClientId
        }).then(resolve);
      });
    });
  }

  private async performGoogleLogin(): Promise<void> {
    const googleUser = await window.gapi.auth2.getAuthInstance().signIn();
    const idToken = googleUser.getAuthResponse().id_token;
    return this.sendTokenToBackend('google', idToken);
  }

  private initializeFacebookAuth(): Promise<void> {
    return new Promise((resolve) => {
      (window as any).FB.init({
        appId: environment.facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
      resolve();
    });
  }

  private performFacebookLogin(): Promise<void> {
    return new Promise((resolve, reject) => {
      (window as any).FB.login(async (response: any) => {
        if (response.authResponse) {
          await this.sendTokenToBackend('facebook', response.authResponse.accessToken);
          resolve();
        } else {
          reject('Facebook login failed');
        }
      });
    });
  }

  private sendTokenToBackend(provider: string, token: string): Promise<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/${provider}`, { token }).toPromise();
  }
}