import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { HeaderComponent } from './app/components/header/header.component';
import { FeedComponent } from './app/components/feed/feed.component';
import { LoginComponent } from './app/components/auth/login/login.component';
import { RegisterComponent } from './app/components/auth/register/register.component';
import { AuthGuard } from './app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: FeedComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f0f2f5;
    }
  `]
})
export class App {
  name = 'HobbyConnect';
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});