import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/user.model';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="grid gap-4">
        <div *ngFor="let post of posts" class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center mb-4">
            <img [src]="post.avatarUrl || 'assets/default-avatar.png'" 
                 class="w-10 h-10 rounded-full mr-3"
                 alt="User avatar">
            <div>
              <h3 class="font-bold">{{post.username}}</h3>
              <span class="text-sm text-gray-500">{{post.createdAt | date}}</span>
            </div>
          </div>
          <p class="mb-4">{{post.content}}</p>
          <div *ngIf="post.mediaUrls?.length" class="mb-4">
            <img *ngFor="let url of post.mediaUrls" 
                 [src]="url" 
                 class="rounded-lg max-h-96 w-full object-cover"
                 alt="Post media">
          </div>
          <div class="flex items-center space-x-4">
            <button class="flex items-center space-x-1">
              <span>❤️</span>
              <span>{{post.likes}}</span>
            </button>
            <button class="flex items-center space-x-1">
              <span>💬</span>
              <span>{{post.comments?.length || 0}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FeedComponent implements OnInit {
  posts: Partial<Post>[] = [
    {
      id: '1',
      content: 'Just finished my latest gardening project! 🌱',
      likes: 12,
      comments: [],
      createdAt: new Date(),
      category: 'gardening',
      username: 'GardenLover',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      content: 'Check out this amazing sunset shot! 📸',
      likes: 25,
      comments: [],
      createdAt: new Date(),
      category: 'photography',
      username: 'PhotoEnthusiast',
      avatarUrl: 'https://i.pravatar.cc/150?img=2'
    }
  ];

  ngOnInit() {
    // In the future, we'll fetch posts from a service
  }
}