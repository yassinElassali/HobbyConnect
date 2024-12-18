import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';
import { PostActionsComponent } from './post-actions.component';
import { PostHeaderComponent } from './post-header.component';
import { PostMediaComponent } from './post-media.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    PostActionsComponent,
    PostHeaderComponent,
    PostMediaComponent
  ],
  template: `
    <div class="bg-white rounded-lg shadow p-4">
      <app-post-header
        [username]="post.username"
        [avatarUrl]="post.avatarUrl"
        [createdAt]="post.createdAt">
      </app-post-header>
      
      <p class="mb-4">{{post.content}}</p>
      
      <app-post-media
        *ngIf="post.mediaUrls?.length"
        [mediaUrls]="post.mediaUrls">
      </app-post-media>
      
      <app-post-actions
        [likes]="post.likes"
        [commentCount]="post.comments?.length || 0"
        (onLike)="handleLike()">
      </app-post-actions>
    </div>
  `
})
export class PostComponent {
  @Input() post!: Partial<Post>;

  handleLike() {
    // Will be implemented with state management
    console.log('Like clicked');
  }
}