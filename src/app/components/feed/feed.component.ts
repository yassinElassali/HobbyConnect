import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';
import { PostComponent } from '../post/post.component';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, PostComponent],
  template: `
    <div class="container mx-auto p-4">
      <div class="grid gap-4">
        <app-post *ngFor="let post of posts" 
                 [post]="post">
        </app-post>
      </div>
    </div>
  `
})
export class FeedComponent implements OnInit {
  posts: Partial<Post>[] = [];
  
  constructor(private feedService: FeedService) {}

  ngOnInit() {
    this.posts = this.feedService.getMockPosts();
  }
}