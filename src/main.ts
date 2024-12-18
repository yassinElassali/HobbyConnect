import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app/components/header/header.component';
import { FeedComponent } from './app/components/feed/feed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FeedComponent],
  template: `
    <app-header></app-header>
    <main>
      <app-feed></app-feed>
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
    provideRouter([])
  ]
});