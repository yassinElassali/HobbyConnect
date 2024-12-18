export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls?: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  category: string;
  username?: string;
  avatarUrl?: string;
}