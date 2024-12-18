export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  interests: string[];
  avatarUrl?: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls?: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  category: string;
}