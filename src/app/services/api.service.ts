import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.hobbyconnect.com'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(userData: Partial<User>, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, { ...userData, password });
  }

  resetPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/reset-password`, { email });
  }

  updatePassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/update-password`, { token, newPassword });
  }

  validateResetToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/auth/validate-reset-token`, { token });
  }
}