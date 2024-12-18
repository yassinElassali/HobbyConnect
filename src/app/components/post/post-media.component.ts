import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-media',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-4">
      <img *ngFor="let url of mediaUrls" 
           [src]="url" 
           class="rounded-lg max-h-96 w-full object-cover"
           alt="Post media">
    </div>
  `
})
export class PostMediaComponent {
  @Input() mediaUrls: string[] = [];
}