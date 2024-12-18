import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-4">
      <button class="flex items-center space-x-1" (click)="onLike.emit()">
        <span>❤️</span>
        <span>{{likes}}</span>
      </button>
      <button class="flex items-center space-x-1">
        <span>💬</span>
        <span>{{commentCount}}</span>
      </button>
    </div>
  `
})
export class PostActionsComponent {
  @Input() likes: number = 0;
  @Input() commentCount: number = 0;
  @Output() onLike = new EventEmitter<void>();
}