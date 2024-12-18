import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-primary p-4">
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">HobbyConnect</h1>
        <div class="space-x-4">
          <ng-container *ngIf="authService.currentUser$ | async as user; else authLinks">
            <a routerLink="/home">Home</a>
            <a routerLink="/explore">Explore</a>
            <a routerLink="/events">Events</a>
            <a routerLink="/profile">Profile</a>
            <button (click)="logout()" class="text-white hover:text-gray-200">Logout</button>
          </ng-container>
          <ng-template #authLinks>
            <a routerLink="/login">Login</a>
            <a routerLink="/register">Register</a>
          </ng-template>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    header {
      background-color: #2c3e50;
      color: white;
    }

    a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}