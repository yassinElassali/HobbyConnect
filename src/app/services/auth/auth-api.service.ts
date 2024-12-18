import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { LoginCredentials, RegistrationData, PasswordResetRequest, PasswordUpdate } from '../../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, credentials);
  }

  register(data: RegistrationData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, data);
  }

  requestPasswordReset(data: PasswordResetRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/reset-password`, data);
  }

  validateResetToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/validate-reset-token`, { token });
  }

  resetPassword(data: PasswordUpdate): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/update-password`, data);
  }

  refreshToken(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/refresh-token`, {});
  }
}