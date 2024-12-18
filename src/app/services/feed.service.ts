import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  getMockPosts(): Partial<Post>[] {
    return [
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
  }
}