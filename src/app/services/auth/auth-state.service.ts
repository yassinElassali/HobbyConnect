import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { getFromStorage, setInStorage, removeFromStorage } from '../../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const user = getFromStorage<User>('currentUser');
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  updateUser(user: User): void {
    setInStorage('currentUser', user);
    this.currentUserSubject.next(user);
  }

  clearUser(): void {
    removeFromStorage('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}