import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center mb-4">
      <img [src]="avatarUrl || 'assets/default-avatar.png'" 
           class="w-10 h-10 rounded-full mr-3"
           alt="User avatar">
      <div>
        <h3 class="font-bold">{{username}}</h3>
        <span class="text-sm text-gray-500">{{createdAt | date}}</span>
      </div>
    </div>
  `
})
export class PostHeaderComponent {
  @Input() username!: string;
  @Input() avatarUrl?: string;
  @Input() createdAt!: Date;
}