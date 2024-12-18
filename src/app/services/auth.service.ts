import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { SocialAuthService } from './social-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.apiService.login(email, password).pipe(
      tap(user => this.handleAuthSuccess(user))
    );
  }

  register(userData: Partial<User>, password: string): Observable<User> {
    return this.apiService.register(userData, password).pipe(
      tap(user => this.handleAuthSuccess(user))
    );
  }

  async loginWithGoogle(): Promise<void> {
    try {
      await this.socialAuthService.loginWithGoogle();
      // Handle successful login
    } catch (error) {
      // Handle error
      console.error('Google login failed:', error);
    }
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.apiService.resetPassword(email);
  }

  validateResetToken(token: string): Observable<boolean> {
    return this.apiService.validateResetToken(token);
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.apiService.updatePassword(token, newPassword);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private handleAuthSuccess(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}